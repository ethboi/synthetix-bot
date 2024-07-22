import moment from 'moment';
import axios from 'axios';
import { Buyback } from '../types/buyback'; 
import { BASESCAN_API } from '../config/';
import { urls } from '../constants/urls'

export async function GetBuybackData() {
  try {
    const apiKey = BASESCAN_API;
    const url = `${urls.BASESCAN_API_URL}?module=logs&action=getLogs&fromBlock=15000006&toBlock=latest&topic0=0x840f6b22bacac5a7ec150e55e4101f796377c95c8b315bbfd6c943958d5a83f8&address=0x632caa10a56343c5e6c0c066735840c096291b18&apikey=${apiKey}`;
    const response = await axios.post(url, {}, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });

    console.log('Buyback data:', response.data.result);
    const buybackData = await parseBuybackData(response.data.result);
    return buybackData;
  } catch (error) {
    console.error('Error fetching buyback data:');
    throw error;
  } 
}

async function parseBuybackData(data: any[]): Promise<Buyback> {
  const weeklyBurnedSNX = calculateWeeklyBurnedSNX(data);
  const totalBurnedSNX = await FetchTotalBurnedSNX();

  const latestEntry = data[data.length - 1];
  const burnedSNX = latestEntry?.data ? parseBurnedSNXData(latestEntry.data) : 0;
  const burnedUSD = latestEntry?.data ? parseBurnedUSDData(latestEntry.data) : 0;

  const lastBurnEventTimestampHex = latestEntry?.timeStamp || '0';
  const lastBurnEventTimestampDecimal = parseInt(lastBurnEventTimestampHex, 16);
  const lastBurnEventDate = new Date(lastBurnEventTimestampDecimal * 1000);

  return {
    burnedSNX,
    weeklyBurnedSNX,
    totalBurnedSNX,
    burnedUSD,
    lastBurnEvent: lastBurnEventDate.toISOString(), 
  };
}

function calculateWeeklyBurnedSNX(data: any[]): number {
  const now = moment.utc();
  const lastWednesday = getLastWednesday(now);

  console.log('Current UTC Time:', now.format());
  console.log('Last Wednesday UTC Time:', lastWednesday.format());

  let weeklyBurnedSNX = 0;

  for (const entry of data) {
    if (!entry?.timeStamp || !entry?.data) {
      console.error('Entry is missing timeStamp or data:', entry);
      continue;
    }
    const entryDate = moment.unix(parseInt(entry.timeStamp, 16)).utc();
    console.log('Processing entry with timestamp:', entry.timeStamp);
    console.log('Entry Date UTC:', entryDate.format());
    console.log(`Last Wednesday: ${lastWednesday.format()}`);
    console.log(`Now: ${now.format()}`);

    if (entryDate.isSameOrAfter(lastWednesday) && entryDate.isBefore(now)) {
      const burnedSNX = parseBurnedSNXData(entry.data);
      console.log('Entry is within the current week. Burned SNX for this entry:', burnedSNX);
      weeklyBurnedSNX += burnedSNX;
    } else {
      console.log('Entry is not within the current week.');
    }
  }

  console.log('Total Weekly Burned SNX:', weeklyBurnedSNX);
  return weeklyBurnedSNX;
}

function getLastWednesday(date: moment.Moment): moment.Moment {
  let lastWednesday = date.clone().day(-4); // Set to Wednesday of the current week
  if (date.day() < 3) { // If today is before Wednesday, get the previous Wednesday
    lastWednesday = lastWednesday.subtract(1, 'week');
  }
  return lastWednesday.startOf('day'); // Start of the day for last Wednesday
}

function parseBurnedSNXData(data: string): number {
  const hexValue = data.slice(2, 66); 
  const SNXValue = parseInt(hexValue, 16);
  const formattedValue = SNXValue / 1e18;
  return formattedValue;
}

function parseBurnedUSDData(data: string): number {
  const hexValue = data.slice(67, 130); 
  return parseInt(hexValue, 16);
}
export async function FetchTotalBurnedSNX(): Promise<number> {
  const apiKey = "UtVawInmrDDw0gldiYI_IOHqoNcUaGip";  
  const baseURL = `https://base-mainnet.g.alchemy.com/v2/${apiKey}`;
  
  const snxContractAddress = "0x22e6966B799c4D5B13BE962E1D117b56327FDa66";  
  const burnAddress = "0x000000000000000000000000000000000000dead";

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "method": "alchemy_getTokenBalances",
    "params": [burnAddress, [snxContractAddress]],
    "id": 1
  });

  const config = {
    method: 'post',
    url: baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios(config);
    console.log('Alchemy response:', response.data);
    if (response.data.result && response.data.result.tokenBalances[0].tokenBalance) {
      const burnedSNX = parseInt(response.data.result.tokenBalances[0].tokenBalance) / 1e18;
      console.log(`Total Burned SNX: ${burnedSNX}`);
      return burnedSNX;
    } else {
      console.error('Failed to fetch or no balance returned');
      return 0; // Default value
    }
  } catch (error) {
    return 0; // Default value
  }
}


// import moment from 'moment'

// import { urls } from '../constants/urls'
// import axios from 'axios'
// import { Buyback } from '../types/buyback'; 
// import { BASESCAN_API } from '../config/';

// export async function GetBuybackData() {
//   try {
//     const apiKey = "4N3FZPBS52ITAUWPQ5UU9Z641TZN7SE9AJ";
//     // OLD ADRESS: const url = `${urls.BASESCAN_API_URL}?module=logs&action=getLogs&fromBlock=1&toBlock=latest&topic0=0x840f6b22bacac5a7ec150e55e4101f796377c95c8b315bbfd6c943958d5a83f8&address=0x53f1e640c058337a12d036265681bc172e6fb962&apikey=${apiKey}`;
//     const url = `${urls.BASESCAN_API_URL}?module=logs&action=getLogs&fromBlock=1&toBlock=latest&topic0=0x840f6b22bacac5a7ec150e55e4101f796377c95c8b315bbfd6c943958d5a83f8&address=0x632caa10a56343c5e6c0c066735840c096291b18&apikey=${apiKey}`;
//     // console.log('Fetching buyback data from URL:', url);
//     const response = await axios.get(url, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
//       }
//     });
//     // console.log(response.data.result);
//     const buybackData = parseBuybackData(response.data.result);
    
//     console.log(buybackData);
//     return buybackData;
//   } catch (error) {
//     console.error('Error fetching buyback data:');
//     throw error;
//   } 
// }

// // export async function FetchTotalBurnedSNX() {
// //   try {
// //     const apiKey = BASESCAN_API;
// //     const snxContractAddress = '0x22e6966B799c4D5B13BE962E1D117b56327FDa66'; //SNX contract address
// //     const accountAddress = '0x000000000000000000000000000000000000dead'; //Burn Adress
// //     const url = `${urls.BASESCAN_API_URL}?module=account&action=tokenbalance&contractaddress=${snxContractAddress}&address=${accountAddress}&tag=latest&apikey=${apiKey}`;
// //     const response = await axios.get(url, {
// //       headers: {
// //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
// //       }
// //     });

// //     // console.log('response data',response.data);  
// //     const totalBurnedSNX = parseInt(response.data.result) / 1e18; // Convert from wei to SNX

// //     // console.log(`Total Burned SNX: ${totalBurnedSNX}`);
    
// //     return totalBurnedSNX;
// //   } catch (error) {
// //     console.error('Error fetching total burned SNX:', error);
// //     throw error;
// //   }
// // }

// export async function FetchTotalBurnedSNX() {
//   const apiKey = "t6wG2X84EFuaOD2MET30v-U7vjSkFmJ1";  
//   const baseURL = `https://base-mainnet.g.alchemy.com/v2/${apiKey}`;
  
//   // SNX contract address 
//   const snxContractAddress = "0x22e6966B799c4D5B13BE962E1D117b56327FDa66";  
//   // The burn address where SNX are sent to be burned
//   const burnAddress = "0x000000000000000000000000000000000000dead";

//   const data = JSON.stringify({
//     "jsonrpc": "2.0",
//     "method": "alchemy_getTokenBalances",
//     "params": [burnAddress, [snxContractAddress]],
//     "id": 1
//   });

//   const config = {
//     method: 'post',
//     url: baseURL,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: data
//   };

//   try {
//     const response = await axios(config);
//     // console.log('response data:', response.data.result)
//     if (response.data.result && response.data.result.tokenBalances[0].tokenBalance) {
//       const burnedSNX = parseInt(response.data.result.tokenBalances[0].tokenBalance) / 1e18;
//       console.log(`Total Burned SNX: ${burnedSNX}`);
//       return burnedSNX;
//     } else {
//       console.error('Failed to fetch or no balance returned');
//     }
//   } catch (error) {
//     console.error('Error fetching burned SNX:', error);
//     throw error
//   }
// }


// async function parseBuybackData(data: any[]): Promise<Buyback> {
//   const weeklyBurnedSNX = calculateWeeklyBurnedSNX(data);
//   const totalBurnedSNX = Number(FetchTotalBurnedSNX());; // Await the async call

//   const latestEntry = data[data.length - 1];
//   const burnedSNX = parseBurnedSNXData(latestEntry.data);
//   const burnedUSD = parseBurnedUSDData(latestEntry.data);

//   const lastBurnEventTimestampHex = latestEntry.timeStamp;
//   const lastBurnEventTimestampDecimal = parseInt(lastBurnEventTimestampHex, 16);
//   const lastBurnEventDate = new Date(lastBurnEventTimestampDecimal * 1000);

//   return {
//     burnedSNX,
//     weeklyBurnedSNX,
//     totalBurnedSNX, // Now including the awaited value
//     burnedUSD,
//     lastBurnEvent: lastBurnEventDate.toISOString(), 
//   };
// }

// // Calculate weekly amount of burned SNX
// function calculateWeeklyBurnedSNX(data: any[]): number {
//   const now = moment.utc();
//   const lastWednesday = getLastWednesday(now);

//   console.log('Current UTC Time:', now.format());
//   console.log('Last Wednesday UTC Time:', lastWednesday.format());

//   let weeklyBurnedSNX = 0;

//   for (const entry of data) {
//     const entryDate = moment.unix(parseInt(entry.timeStamp, 16)).utc();
//     console.log('Processing entry with timestamp:', entry.timeStamp);
//     console.log('Entry Date UTC:', entryDate.format());
//     console.log(`Last Wednesday: ${lastWednesday.format()}`);
//     console.log(`Now: ${now.format()}`);

//     if (entryDate.isSameOrAfter(lastWednesday) && entryDate.isBefore(now)) {
//       const burnedSNX = parseBurnedSNXData(entry.data);
//       console.log('Entry is within the current week. Burned SNX for this entry:', burnedSNX);
//       weeklyBurnedSNX += burnedSNX;
//     } else {
//       console.log('Entry is not within the current week.');
//     }
//   }

//   console.log('Total Weekly Burned SNX:', weeklyBurnedSNX);
//   return weeklyBurnedSNX;
// }

// function getLastWednesday(date: moment.Moment): moment.Moment {
//   let lastWednesday = date.clone().day(3); // Set to Wednesday of the current week
//   if (date.day() < 3) { // If today is before Wednesday, get the previous Wednesday
//     lastWednesday = lastWednesday.subtract(1, 'week');
//   }
//   return lastWednesday.startOf('day'); // Start of the day for last Wednesday
// }





// // // Calculate total amount of burned SNX
// // function calculateTotalBurnedSNX(data: any[]): number {
// //   let totalBurnedSNX = 0;
// //   for (const entry of data) {
// //     const burnedSNX = parseBurnedSNXData(entry.data);
// //     totalBurnedSNX += burnedSNX;
// //   }
// //   return totalBurnedSNX;
// // }

// //Calculate latest amount of burned SNX
// function parseBurnedSNXData(data: string): number {
//   const hexValue = data.slice(2, 66); 
//   const SNXValue = parseInt(hexValue, 16);
//   const formattedValue=SNXValue/1e18;
//   return formattedValue;
// }

// function parseBurnedUSDData(data: string): number {
//   const hexValue = data.slice(67, 130); 
//   return parseInt(hexValue, 16);
// }

