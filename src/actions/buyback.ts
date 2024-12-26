import moment from 'moment'

import { urls } from '../constants/urls'
import axios from 'axios'
import { Buyback } from '../types/buyback'
import { BASESCAN_API_KEY, ALCHEMY_BASE_API_KEY } from '../config/'

export async function GetBuybackData() {
  try {
    const currentBlock = await getCurrentBlockNumber(BASESCAN_API_KEY)
    const fromBlock = calculateFromBlock(currentBlock)
    const toBlock = 'latest'
    const url = `${urls.BASESCAN_API_URL}?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${toBlock}&topic0=0x840f6b22bacac5a7ec150e55e4101f796377c95c8b315bbfd6c943958d5a83f8&address=0x632caa10a56343c5e6c0c066735840c096291b18&apikey=${BASESCAN_API_KEY}`
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    })
    if (!response.data || !response.data.result || response.data.result.length === 0) {
      console.warn('No logs found. Returning weekly burned SNX as 0.')
      // const totalBurnedSNX = await FetchTotalBurnedSNX();
      return {
        burnedSNX: 0,
        weeklyBurnedSNX: 0,
        // totalBurnedSNX,
        burnedUSD: 0,
        lastBurnEvent: 'No recent burn event',
      }
    } else {
      return parseBuybackData(response.data.result)
    }
  } catch (error) {
    console.error('Error fetching buyback data')
    throw error
  }
}

async function getCurrentBlockNumber(BASESCAN_API_KEY: string): Promise<number> {
  const url = `${urls.BASESCAN_API_URL}?module=proxy&action=eth_blockNumber&apikey=${BASESCAN_API_KEY}`
  const response = await axios.get(url)
  return parseInt(response.data.result, 16)
}

function calculateFromBlock(currentBlock: number): number {
  const now = moment.utc()
  const lastWednesday = getLastWednesday(now)
  const secondsSinceLastWednesday = now.diff(lastWednesday, 'seconds')
  const blocksSinceLastWednesday = Math.floor(secondsSinceLastWednesday / 2)
  return currentBlock - blocksSinceLastWednesday
}

export async function FetchTotalBurnedSNX() {
  const baseURL = `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_BASE_API_KEY}`
  // SNX contract address
  const snxContractAddress = '0x22e6966B799c4D5B13BE962E1D117b56327FDa66'
  // The burn address where SNX are sent to be burned
  const burnAddress = '0x000000000000000000000000000000000000dead'

  const data = JSON.stringify({
    jsonrpc: '2.0',
    method: 'alchemy_getTokenBalances',
    params: [burnAddress, [snxContractAddress]],
    id: 1,
  })

  const config = {
    method: 'post',
    url: baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  }

  try {
    const response = await axios(config)
    // console.log('response data:', response.data.result)
    if (response.data.result && response.data.result.tokenBalances[0].tokenBalance) {
      const burnedSNX = parseInt(response.data.result.tokenBalances[0].tokenBalance) / 1e18
      console.log(`Total Burned SNX: ${burnedSNX}`)
      return burnedSNX
    } else {
      console.error('Failed to fetch or no balance returned')
    }
  } catch (error) {
    console.error('Error fetching burned SNX:', error)
    throw error
  }
}

async function parseBuybackData(data: any[]): Promise<Buyback> {
  const totalBurnedSNX = (await FetchTotalBurnedSNX()) || 0 // Default to 0 if undefined

  const latestEntry = data.length > 0 ? data[data.length - 1] : null

  let burnedSNX = 0
  let burnedUSD = 0
  let lastBurnEventDate = 'No recent burn event'

  if (latestEntry && latestEntry.data) {
    burnedSNX = parseBurnedSNXData(latestEntry.data)
    burnedUSD = parseBurnedUSDData(latestEntry.data)

    const lastBurnEventTimestampHex = latestEntry.timeStamp
    const lastBurnEventTimestampDecimal = parseInt(lastBurnEventTimestampHex, 16)
    lastBurnEventDate = new Date(lastBurnEventTimestampDecimal * 1000).toISOString()
  }

  return {
    burnedSNX,
    weeklyBurnedSNX: calculateWeeklyBurnedSNX(data),
    // totalBurnedSNX, // This is now guaranteed to be a number
    burnedUSD,
    lastBurnEvent: lastBurnEventDate,
  }
}

// Calculate weekly amount of burned SNX
function calculateWeeklyBurnedSNX(data: any[]): number {
  const now = moment.utc()
  const lastWednesday = getLastWednesday(now)

  console.log('Current UTC Time:', now.format())
  console.log('Last Wednesday UTC Time:', lastWednesday.format())

  let weeklyBurnedSNX = 0

  for (const entry of data) {
    const entryDate = moment.unix(parseInt(entry.timeStamp, 16)).utc()
    // console.log('Processing entry with timestamp:', entry.timeStamp);
    // console.log('Entry Date UTC:', entryDate.format());
    // console.log(`Last Wednesday: ${lastWednesday.format()}`);
    // console.log(`Now: ${now.format()}`);

    if (entryDate.isSameOrAfter(lastWednesday) && entryDate.isBefore(now)) {
      const burnedSNX = parseBurnedSNXData(entry.data)
      // console.log('Entry is within the current week. Burned SNX for this entry:', burnedSNX);
      weeklyBurnedSNX += burnedSNX
    } else {
      // console.log('Entry is not within the current week.');
    }
  }

  // console.log('Total Weekly Burned SNX:', weeklyBurnedSNX);
  return weeklyBurnedSNX
}

function getLastWednesday(date: moment.Moment): moment.Moment {
  let lastWednesday = date.clone().day(3) // Set to Wednesday of the current week
  if (date.day() < 3) {
    // If today is before Wednesday, get the previous Wednesday
    lastWednesday = lastWednesday.subtract(1, 'week')
  }
  return lastWednesday.startOf('day') // Start of the day for last Wednesday
}

//Calculate latest amount of burned SNX
function parseBurnedSNXData(data: string): number {
  const hexValue = data.slice(2, 66)
  const SNXValue = parseInt(hexValue, 16)
  const formattedValue = SNXValue / 1e18
  return formattedValue
}

function parseBurnedUSDData(data: string): number {
  const hexValue = data.slice(67, 130)
  return parseInt(hexValue, 16)
}
