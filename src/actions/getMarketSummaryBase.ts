import { ethers } from 'ethers';
import { alchemyProviderBase } from '../utils/providerBase';
import { MarketSummary } from '../types/markets';
import contractData from '../contracts/abis/PerpsMarketProxy.json';
import { getDailyStatsBase } from './volumeBase'; // Import the volume calculation function

// Define the contract instance
const contractAddress = contractData.address;
const perpsMarketProxyABI = contractData.abi;
const contract = new ethers.Contract(contractAddress, perpsMarketProxyABI, alchemyProviderBase);

// Function to get the block number by timestamp
async function getBlockByTimestamp(timestamp: number): Promise<number | null> {
  const currentBlock = await alchemyProviderBase.getBlockNumber();
  let minBlock = 0;
  let maxBlock = currentBlock;

  while (minBlock <= maxBlock) {
    const midBlock = Math.floor((minBlock + maxBlock) / 2);
    const block = await alchemyProviderBase.getBlock(midBlock);

    if (!block) {
      console.error(`Block ${midBlock} not found`);
      return null;
    }

    if (block.timestamp < timestamp) {
      minBlock = midBlock + 1;
    } else {
      maxBlock = midBlock - 1;
    }
  }

  const finalBlock = await alchemyProviderBase.getBlock(minBlock);
  if (!finalBlock) {
    console.error(`Final block ${minBlock} not found`);
    return null;
  }

  console.log(`Block found for timestamp ${timestamp}: ${finalBlock.number}`);
  return finalBlock.number;
}

export async function GetMarketSummariesBase(prevDay?: number): Promise<MarketSummary[]> {
  const marketKeys = [
    "sETHPERP",
    "sBTCPERP",
    "sLINKPERP",
    "sSOLPERP",
    "sAVAXPERP",
    "sAAVEPERP",
    "sUNIPERP",
    "sMATICPERP"
  ];
  const summaries: MarketSummary[] = [];

  // Fetch daily volume data
  const dailyVolumes = await getDailyStatsBase();
  const currentDailyVolumes = dailyVolumes[0];
  const previousDailyVolumes = dailyVolumes[1];

  for (const key of marketKeys) {
    try {
      const summary = await contract.getMarketSummary(ethers.utils.formatBytes32String(key));

      summaries.push({
        asset: key,
        key: key,
        market: key,
        originalAsset: key,
        maxLeverage: 10,  // Replace with actual max leverage if available
        marketSize: parseFloat(ethers.utils.formatUnits(summary.size, 18)),
        marketValue: parseFloat(ethers.utils.formatUnits(summary.size, 18)),
        marketSkew: parseFloat(ethers.utils.formatUnits(summary.marketSkew, 18)),
        marketDebt: parseFloat(ethers.utils.formatUnits(summary.marketDebt, 18)),
        currentFundingRate: parseFloat(ethers.utils.formatUnits(summary.currentFundingRate, 18)),
        currentFundingVelocity: parseFloat(ethers.utils.formatUnits(summary.currentFundingVelocity, 18)),
        price: parseFloat(ethers.utils.formatUnits(summary.indexPrice, 18)),
        settings: undefined,  // Replace with actual settings if available
      });
    } catch (error) {
      console.error(`Error fetching summary for market ${key}:`, error);
    }
  }

  return summaries;
}
