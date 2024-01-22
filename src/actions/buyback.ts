import { alchemyProvider } from '../utils/providers'
import RpcClient from '../utils/rpcClient'
import { PerpsV2MarketData__factory, SupplySchedule__factory } from '../contracts/typechain'
import { PerpsV2FundingDataContractAddress } from '../constants/addresses'
import printObject from '../utils/printObject'
import { MarketSettings, MarketSummary } from '../types/markets'
import { hexToAscii } from '../utils/formatString'
import fromBigNumber from '../utils/fromBigNumber'
import { ethers } from 'ethers'
import EthDater from 'ethereum-block-by-date'
import moment from 'moment'
import { Inflation, Result, BuybackData } from '../types/buyback'
import { SupplyMintedEvent } from '../contracts/typechain/SupplySchedule'
import fromWei from '../utils/fromWei'
import { wei } from '@synthetixio/wei'
import { calculatePercentageChange } from '../utils/utils'

import { urls } from '../constants/urls'
import axios from 'axios'
import { Buyback } from '../types/buyback'; 

export async function GetBuybackData() {
  try {
    const url = `${urls.BASESCAN_API_URL}?module=logs&action=getLogs&fromBlock=1&toBlock=latest&topic0=0x840f6b22bacac5a7ec150e55e4101f796377c95c8b315bbfd6c943958d5a83f8&address=0x53f1e640c058337a12d036265681bc172e6fb962`
    const response = await axios.get(url);
    console.log(response.data.result);
    const buybackData = parseBuybackData(response.data.result);
    
    console.log(buybackData);
    return buybackData;
  } catch (error) {
    console.error('Error fetching buyback data:', error);
    throw error;
  } 
}

function parseBuybackData(data: any[]): Buyback {
  const weeklyBurnedSNX = calculateWeeklyBurnedSNX(data);
  const totalBurnedSNX = calculateTotalBurnedSNX(data);

  const latestEntry = data[data.length - 1];
  const burnedSNX = parseBurnedSNXData(latestEntry.data);
  const burnedUSD = parseBurnedUSDData(latestEntry.data);

  const lastBurnEventTimestampHex = latestEntry.timeStamp;
  const lastBurnEventTimestampDecimal = parseInt(lastBurnEventTimestampHex, 16);

  // Convert decimal timestamp to JavaScript Date object
  const lastBurnEventDate = new Date(lastBurnEventTimestampDecimal * 1000); // Multiply by 1000 to convert to milliseconds
  return {
    burnedSNX,
    weeklyBurnedSNX,
    totalBurnedSNX,
    burnedUSD,
    lastBurnEvent: lastBurnEventDate.toISOString(), 
  };
}

// Calculate the weekly (wednesday to wednesday burned SNX)
function calculateWeeklyBurnedSNX(data: any[]): number {
  const now = moment();
  const lastWednesday = now.clone().weekday(-3); // Get the last Wednesday

  let weeklyBurnedSNX = 0;

  for (const entry of data) {
    const entryDate = moment.unix(parseInt(entry.timeStamp, 16));
    // Check if the entry date is within the current week (from last Wednesday to this Wednesday)
    if (entryDate.isSameOrAfter(lastWednesday) && entryDate.isBefore(now)) {
      const burnedSNX = parseBurnedSNXData(entry.data);
      weeklyBurnedSNX += burnedSNX;
    }
  }

  console.log('weekly burned supply:');
  console.log(weeklyBurnedSNX);

  return weeklyBurnedSNX;
}
// Calculate total amount of burned SNX
function calculateTotalBurnedSNX(data: any[]): number {
  let totalBurnedSNX = 0;

  for (const entry of data) {
    const burnedSNX = parseBurnedSNXData(entry.data);
    totalBurnedSNX += burnedSNX;
  }
  console.log('total burned supply:')
  console.log(totalBurnedSNX);

  return totalBurnedSNX;
}

//Calculate latest amount of burned SNX
function parseBurnedSNXData(data: string): number {
  const hexValue = data.slice(2, 66); 
  const SNXValue = parseInt(hexValue, 16);
  const formattedValue=SNXValue/1e18;
  return formattedValue;
}

function parseBurnedUSDData(data: string): number {
  const hexValue = data.slice(67, 130); 
  return parseInt(hexValue, 16);
}

