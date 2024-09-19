import { ethers } from 'ethers';
import EthDater from 'ethereum-block-by-date';
import moment from 'moment';
import { providerArb } from '../utils/providers';  // Use the Arbitrum provider

// Import the ABI JSON
import perpsMarketProxyABI from '../contracts/abis/PerpsMarketProxyArb.json';  // ABI for Arbitrum

const contractAddress = '0xd762960c31210Cf1bDf75b06A5192d395EEDC659';  // Contract address for Arbitrum
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
    const dayInSeconds = 86400;  // One day in seconds
    const timestamp = Math.floor(Date.now() / 1000) - dayInSeconds;
    const fromBlock = await getBlockByTimestamp(providerArb, timestamp);
    blockTag = ethers.utils.hexValue(fromBlock);
  }

  const marketIds = await contract.getMarkets();  // Fetching market IDs

  let totalOI = 0;

  for (const marketId of marketIds) {
    try {
      const summary = await contract.getMarketSummary(marketId, { blockTag });  // Fetching the market summary

      const [, size, , , , indexPrice] = summary;  // Deconstruct to get size and indexPrice

      const marketSize = parseFloat(ethers.utils.formatUnits(size, 18));  // Convert size from Wei
      const price = parseFloat(ethers.utils.formatUnits(indexPrice, 18));  // Convert price from Wei

      totalOI += marketSize * price;  // Open interest = size * index price
    } catch (error) {
      console.error(`Error fetching summary for market ${marketId.toString()}:`);
      // console.log(error);
    }
  }
  // console.log(`total OI on ARBITRUM ################## ${totalOI}`);

  return totalOI;
}
