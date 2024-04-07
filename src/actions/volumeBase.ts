import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

// Import the ABI JSON 
import  contractData  from '../contracts/abis/PerpsMarketProxy.json';
import { ALCHEMY_ID, ALCHEMY_BASE_API_URL } from '../config';

// Initialize Web3 with Alchemy
const ALCHEMY_API_KEY = ALCHEMY_ID;
const web3 = new Web3(new Web3.providers.HttpProvider(ALCHEMY_BASE_API_URL));

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


async function calculateVolume(startBlock: any, endBlock: any) {
    let totalVolume = 0;

    // Calculate trade volume
    const tradeEvents: any = await (perpsMarketProxyContract as any).getPastEvents('OrderSettled', {
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
    const marketUpdatedEvents: any = await (perpsMarketProxyContract as any).getPastEvents('MarketUpdated', {
        fromBlock: startBlock,
        toBlock: endBlock,
    });

    // Prepare a map of the latest prices per marketId
      const marketPrices: Record<string, number> = {}; // This defines the object type more explicitly

    marketUpdatedEvents.forEach((event: any) => {
        const marketId = event.returnValues.marketId;
        const priceUSD = parseFloat(event.returnValues.price) / 1e18; // Adjust if necessary
        marketPrices[marketId] = priceUSD; // This assumes the last price in the range is the relevant one
    });

    // Calculate liquidation volume
    const liquidationEvents: any = await (perpsMarketProxyContract as any).getPastEvents('PositionLiquidated', {
        fromBlock: startBlock,
        toBlock: endBlock,
    });

    // Assuming the liquidation event has the amountLiquidated and price fields
    liquidationEvents.forEach((event: any) => {
        const marketId = event.returnValues.marketId;
        const amountLiquidated = Math.abs(parseFloat(event.returnValues.amountLiquidated)) / 1e18;
        const priceUSD = marketPrices[marketId] || 0; // Use the price from marketPrices map, fallback to 0 if not found
        const liquidationVolumeUSD = amountLiquidated * priceUSD;
        totalVolume += liquidationVolumeUSD;
    });

    return totalVolume;
}

// Function to fetch 24-hour trading volume
export async function getDailyStatsBase() {
    const currentBlock = await web3.eth.getBlockNumber();
    // const oneDayAgoBlock = Number(currentBlock) - 22860; // Approximately 24 hours back
    const oneDayAgoBlock = await findBlockAtStartOfDayUTC(0);
    const twoDaysAgoBlock = await findBlockAtStartOfDayUTC(-1);
    
    const currentVolume = await calculateVolume(oneDayAgoBlock, currentBlock);
    const previousVolume = await calculateVolume(twoDaysAgoBlock, oneDayAgoBlock);


    console.log(`Current 24h Volume (since the start of today UTC): ${currentVolume}`);
    console.log(`Previous 24h Volume (yesterday UTC): ${previousVolume}`);
    
    return[{volume: currentVolume}, {volume: previousVolume}];
}

