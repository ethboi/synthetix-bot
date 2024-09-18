import { ethers } from 'ethers'
import EthDater from 'ethereum-block-by-date'
import moment from 'moment'
import { providerArb } from '../utils/providers' // Assuming providerArb is correctly configured for Arbitrum

// Use the contract address for PerpsMarketProxy on Arbitrum
const contractAddress = '0xd762960c31210Cf1bDf75b06A5192d395EEDC659'; // Manually added contract address for Arbitrum

// Import the ABI JSON
import perpsMarketProxyABI from '../contracts/abis/PerpsMarketProxyArb.json';

// Create contract instance with ABI and address
const contract = new ethers.Contract(contractAddress, perpsMarketProxyABI, providerArb);

// Function to get the block by timestamp using ethereum-block-by-date
async function getBlockByTimestamp(provider: ethers.providers.JsonRpcProvider, timestamp: number) {
  const dater = new EthDater(provider);
  const date = moment.unix(timestamp);
  const blockResult = await dater.getDate(date, true, false);
  return blockResult.block;
}

// Function to get the total open interest on Arbitrum
export async function GetTotalOpenInterestArb(prev: boolean): Promise<number> {
  let blockTag = undefined;

  if (prev) {
    const dayInSeconds = 86400; // One day in seconds
    const timestamp = Math.floor(Date.now() / 1000) - dayInSeconds;
    const fromBlock = await getBlockByTimestamp(providerArb, timestamp); // Use providerArb for Arbitrum
    blockTag = ethers.utils.hexValue(fromBlock);
  }

  const marketIds = await contract.getMarkets(); // Assuming this returns an array of market IDs

  let totalOI = 0;

  for (const marketId of marketIds) {
    try {
      const summary = await contract.getMarketSummary(marketId, { blockTag });

      const [, size, , , , indexPrice] = summary; // Deconstruct to get size and indexPrice

      const marketSize = parseFloat(ethers.utils.formatUnits(size, 18));
      const price = parseFloat(ethers.utils.formatUnits(indexPrice, 18));

      totalOI += marketSize * price;
    } catch (error) {
      // console.error(`Error fetching summary for market ${marketId.toString()}:`);
      // console.log(error); //show full error
    }
  }

  return totalOI;
}
