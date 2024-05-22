import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

// Import the ABI JSON 
import  contractData  from '../contracts/abis/PerpsMarketProxy.json';
// import { ALCHEMY_ID, ALCHEMY_BASE_API_URL } from '../config';

// Initialize Web3 with Alchemy
// const ALCHEMY_API_KEY = ALCHEMY_ID;
const web3 = new Web3(new Web3.providers.HttpProvider('https://base-mainnet.g.alchemy.com/v2/ZM4ULATqKZpG4-6qyYNiI_LkKVIb5Hc3'));

// Define the contract instance
const contractAddress = contractData.address; // Use the address from the file
const perpsMarketProxyABI = contractData.abi as AbiItem[];

const perpsMarketProxyContract = new web3.eth.Contract(perpsMarketProxyABI, contractAddress);

// Function to find the block number at the start of a day given a day offset
async function findBlockAtStartOfDayUTC(dayOffset: number) {
    const now = new Date();
    now.setUTCDate(now.getUTCDate() + dayOffset);
    const startOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    const targetTimestamp = Math.floor(startOfDayUTC.getTime() / 1000);
    
    return await getBlockNumberFromTimestamp(targetTimestamp, dayOffset);
}

async function getBlockNumberFromTimestamp(targetTimestamp: any, dayOffset: number) {
    const currentTime = Math.floor(Date.now() / 1000); // Current UTC time in seconds
    const secondsSinceTargetTime = currentTime - targetTimestamp;
    // Calculating the approximate number of blocks since the target time
    // 2 seconds per block on Base
    const estimatedBlocksSinceTarget = Math.floor(secondsSinceTargetTime / 2);
    let maxBlock = Number(await web3.eth.getBlockNumber());
    let minBlock = 0;
    if (dayOffset === 0){
        minBlock = maxBlock - estimatedBlocksSinceTarget; // Base says 2 seconds per block over 24 hours
    } else if (dayOffset === -1) {
        minBlock = maxBlock - (estimatedBlocksSinceTarget + 43200); // Base says 2 seconds per block over 24 hours
    }
   
    while (minBlock <= maxBlock) {
        const midBlock = Math.floor((minBlock + maxBlock) / 2);
        const midBlockTime = Number((await web3.eth.getBlock(midBlock)).timestamp);
        
        if (midBlockTime < targetTimestamp) {
            minBlock = midBlock + 1;
        } else {
            maxBlock = midBlock - 1;
        }
        
    }
    return minBlock;
}

// Function to calculate open interest between two blocks
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
export async function getDailyFeesOIBase() {
    const currentBlock = await web3.eth.getBlockNumber();
    const oneDayAgoBlock = await findBlockAtStartOfDayUTC(0);
    const twoDaysAgoBlock = await findBlockAtStartOfDayUTC(-1);
    
    const currentOpenInterest = await calculateOpenInterest(oneDayAgoBlock, currentBlock);
    const previousOpenInterest = await calculateOpenInterest(twoDaysAgoBlock, oneDayAgoBlock);

    console.log(`Current 24h Open Interest (since the start of today UTC): ${currentOpenInterest}`);
    console.log(`Previous 24h Open Interest (yesterday UTC): ${previousOpenInterest}`);
    
    return [{ openInterest: currentOpenInterest }, { openInterest: previousOpenInterest }];
}