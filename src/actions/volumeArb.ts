import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

// Import the ABI JSON
import perpsMarketProxyABI from '../contracts/abis/PerpsMarketProxyArb.json'; // Assuming the ABI is directly the array
import { ALCHEMY_ARB_API_URL } from '../config';

// Set up Web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider(ALCHEMY_ARB_API_URL));

// Use the contract address for PerpsMarketProxy
const contractAddress = '0xd762960c31210Cf1bDf75b06A5192d395EEDC659';

// Create contract instance with ABI and address
const perpsMarketProxyContract = new web3.eth.Contract(perpsMarketProxyABI as AbiItem[], contractAddress);

// Function to get the timestamp for the start of the day in UTC
function getStartOfDayUTCTimestamp(dayOffset: number) {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() + dayOffset);
  const startOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return Math.floor(startOfDayUTC.getTime() / 1000);
}

// Function to find the block number closest to a given timestamp
async function getBlockClosestToTimestamp(timestamp: number) {
  const latestBlock = await web3.eth.getBlock('latest');
  const latestBlockNumber = latestBlock.number;

  let minBlock = 0;
  let maxBlock = latestBlockNumber;

  while (minBlock <= maxBlock) {
    const midBlock = Math.floor((minBlock + maxBlock) / 2);
    const midBlockData = await web3.eth.getBlock(midBlock);

    // Explicitly cast the timestamp to a number
    const midBlockTime = typeof midBlockData.timestamp === 'string'
      ? parseInt(midBlockData.timestamp)
      : midBlockData.timestamp;

    if (midBlockTime < timestamp) {
      minBlock = midBlock + 1;
    } else {
      maxBlock = midBlock - 1;
    }
  }
  return minBlock;
}


// Function to find the block number at the start of a day given a day offset
async function findBlockAtStartOfDayUTC(dayOffset: number) {
  const startOfDayTimestamp = getStartOfDayUTCTimestamp(dayOffset);
  return await getBlockClosestToTimestamp(startOfDayTimestamp);
}

// Function to calculate the volume between two blocks
async function calculateVolume(startBlock: any, endBlock: any) {
  let totalVolume = 0;

  // Calculate trade volume
  const tradeEvents: any = await perpsMarketProxyContract.getPastEvents('OrderSettled', {
    fromBlock: startBlock,
    toBlock: endBlock,
  });

  tradeEvents.forEach((event: any) => {
    const sizeDelta = Math.abs(parseFloat(event.returnValues.sizeDelta)) / 1e18;
    const fillPriceUSD = parseFloat(event.returnValues.fillPrice) / 1e18;
    const volumeUSD = sizeDelta * fillPriceUSD;
    totalVolume += volumeUSD;
  });

  // Fetch MarketUpdated events for price information
  const marketUpdatedEvents: any = await perpsMarketProxyContract.getPastEvents('MarketUpdated', {
    fromBlock: startBlock,
    toBlock: endBlock,
  });

  // Prepare a map of the latest prices per marketId
  const marketPrices: Record<string, number> = {};

  marketUpdatedEvents.forEach((event: any) => {
    const marketId = event.returnValues.marketId;
    const priceUSD = parseFloat(event.returnValues.price) / 1e18;
    marketPrices[marketId] = priceUSD;
  });

  // Calculate liquidation volume
  const liquidationEvents: any = await perpsMarketProxyContract.getPastEvents('PositionLiquidated', {
    fromBlock: startBlock,
    toBlock: endBlock,
  });

  liquidationEvents.forEach((event: any) => {
    const marketId = event.returnValues.marketId;
    const amountLiquidated = Math.abs(parseFloat(event.returnValues.amountLiquidated)) / 1e18;
    const priceUSD = marketPrices[marketId] || 0;
    const liquidationVolumeUSD = amountLiquidated * priceUSD;
    totalVolume += liquidationVolumeUSD;
  });

  return totalVolume;
}

// Function to fetch 24-hour trading volume
export async function getDailyStatsArb() {
  const currentBlock = await web3.eth.getBlockNumber();
  const oneDayAgoBlock = await findBlockAtStartOfDayUTC(0);
  const twoDaysAgoBlock = await findBlockAtStartOfDayUTC(-1);

  const currentVolume = await calculateVolume(oneDayAgoBlock, currentBlock);
  const previousVolume = await calculateVolume(twoDaysAgoBlock, oneDayAgoBlock);

  console.log(`Current 24h ARBITRUM Volume (since the start of today UTC): ${currentVolume}`);
  console.log(`Previous 24h ARBITRUM Volume (yesterday UTC): ${previousVolume}`);

  return [{ volume: currentVolume }, { volume: previousVolume }];
}
