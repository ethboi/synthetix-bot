import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

// Import the ABI JSON
import perpsMarketProxyABI from '../contracts/abis/PerpsMarketProxyArb.json';
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

// Function to calculate the open interest between two blocks
async function calculateOpenInterest(startBlock: number, endBlock: number): Promise<number> {
  let totalOpenInterest = 0;

  const openInterestEvents: any = await perpsMarketProxyContract.getPastEvents('OpenInterestUpdated', {
    fromBlock: startBlock,
    toBlock: endBlock,
  });

  openInterestEvents.forEach((event: any) => {
    const marketValue = Math.abs(parseFloat(event.returnValues.marketValue)) / 1e18;
    totalOpenInterest += marketValue;
  });

  return totalOpenInterest;
}

// Function to fetch 24-hour open interest
export async function getDailyFeesOIArb() {
  const currentBlock = await web3.eth.getBlockNumber();
  const oneDayAgoBlock = await findBlockAtStartOfDayUTC(0);
  const twoDaysAgoBlock = await findBlockAtStartOfDayUTC(-1);

  const currentOpenInterest = await calculateOpenInterest(oneDayAgoBlock, currentBlock);
  const previousOpenInterest = await calculateOpenInterest(twoDaysAgoBlock, oneDayAgoBlock);

  console.log(`Current 24h Open Interest (since the start of today UTC): ${currentOpenInterest}`);
  console.log(`Previous 24h Open Interest (yesterday UTC): ${previousOpenInterest}`);

  return [{ openInterest: currentOpenInterest }, { openInterest: previousOpenInterest }];
}
