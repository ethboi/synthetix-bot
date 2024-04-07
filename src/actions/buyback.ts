
import moment from 'moment'

import { urls } from '../constants/urls'
import axios from 'axios'
import { Buyback } from '../types/buyback'; 
import { BASESCAN_API } from '../config/';

export async function GetBuybackData() {
  try {
    const apiKey = BASESCAN_API;
    // OLD ADRESS: const url = `${urls.BASESCAN_API_URL}?module=logs&action=getLogs&fromBlock=1&toBlock=latest&topic0=0x840f6b22bacac5a7ec150e55e4101f796377c95c8b315bbfd6c943958d5a83f8&address=0x53f1e640c058337a12d036265681bc172e6fb962&apikey=${apiKey}`;
    const url = `${urls.BASESCAN_API_URL}?module=logs&action=getLogs&fromBlock=1&toBlock=latest&topic0=0x840f6b22bacac5a7ec150e55e4101f796377c95c8b315bbfd6c943958d5a83f8&address=0x632caa10a56343c5e6c0c066735840c096291b18&apikey=${apiKey}`;
    
    const response = await axios.get(url); // No headers needed for API key
    
    // console.log(response.data.result);
    const buybackData = parseBuybackData(response.data.result);
    
    // console.log(buybackData);
    return buybackData;
  } catch (error) {
    console.error('Error fetching buyback data:', error);
    throw error;
  } 
}

export async function FetchTotalBurnedSNX() {
  try {
    const snxContractAddress = '0x22e6966B799c4D5B13BE962E1D117b56327FDa66'; //SNX contract address
    const accountAddress = '0x000000000000000000000000000000000000dead'; //Burn Adress
    const url = `${urls.BASESCAN_API_URL}?module=account&action=tokenbalance&contractaddress=${snxContractAddress}&address=${accountAddress}&tag=latest&apikey=${BASESCAN_API}`;
    const response = await axios.get(url); 

    // console.log('response data',response.data);  
    const totalBurnedSNX = parseInt(response.data.result) / 1e18; // Convert from wei to SNX

    // console.log(`Total Burned SNX: ${totalBurnedSNX}`);
    
    return totalBurnedSNX;
  } catch (error) {
    console.error('Error fetching total burned SNX:', error);
    throw error;
  }
}
async function parseBuybackData(data: any[]): Promise<Buyback> {
  const weeklyBurnedSNX = calculateWeeklyBurnedSNX(data);
  // const totalBurnedSNX = await fetchTotalBurnedSNX(); // Await the async call

  const latestEntry = data[data.length - 1];
  const burnedSNX = parseBurnedSNXData(latestEntry.data);
  const burnedUSD = parseBurnedUSDData(latestEntry.data);

  const lastBurnEventTimestampHex = latestEntry.timeStamp;
  const lastBurnEventTimestampDecimal = parseInt(lastBurnEventTimestampHex, 16);
  const lastBurnEventDate = new Date(lastBurnEventTimestampDecimal * 1000);

  return {
    burnedSNX,
    weeklyBurnedSNX,
    // totalBurnedSNX, // Now including the awaited value
    burnedUSD,
    lastBurnEvent: lastBurnEventDate.toISOString(), 
  };
}

// Calculate weekly amount of burned SNX
function calculateWeeklyBurnedSNX(data: any[]): number {
  const now = moment.utc(); // Use UTC if your timestamps are in UTC
  let lastWednesday;

  if (now.weekday() >= 3) {
    // If today is Wednesday or later, last Wednesday is this week
    lastWednesday = now.clone().startOf('week').add(3, 'days'); // Start of this week + 2 days to get to Wednesday
    // console.log('lastWednesday');
    // console.log(lastWednesday);
  } else {
    // If today is before Wednesday, last Wednesday was last week
    lastWednesday = now.clone().subtract(1, 'week').startOf('week').add(3, 'days');
    // console.log('lastWednesday');
    // console.log(lastWednesday);
  }

  let weeklyBurnedSNX = 0;

  for (const entry of data) {
    const entryDate = moment.unix(parseInt(entry.timeStamp, 16)).utc(); // Use UTC if your timestamps are in UTC
    // Check if the entry date is within the current week (from last Wednesday to this Wednesday)
    if (entryDate.isSameOrAfter(lastWednesday) && entryDate.isBefore(now)) {
      const burnedSNX = parseBurnedSNXData(entry.data);
      // console.log('burnedSNX');
      // console.log(burnedSNX);
      weeklyBurnedSNX += burnedSNX;
    }
  }
  return weeklyBurnedSNX;
}


// // Calculate total amount of burned SNX
// function calculateTotalBurnedSNX(data: any[]): number {
//   let totalBurnedSNX = 0;
//   for (const entry of data) {
//     const burnedSNX = parseBurnedSNXData(entry.data);
//     totalBurnedSNX += burnedSNX;
//   }
//   return totalBurnedSNX;
// }

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

