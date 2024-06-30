import { providerOP } from '../utils/providers'
import { PerpsV2MarketData__factory } from '../contracts/typechain'
import { PerpsV2MarketDataOP } from '../constants/addresses'
import { MarketSettings, MarketSummary } from '../types/markets'
import { hexToAscii } from '../utils/formatString'
import fromBigNumber from '../utils/fromBigNumber'
import { ethers } from 'ethers'
import EthDater from 'ethereum-block-by-date'
import moment from 'moment'
import printObject from '../utils/printObject'

export async function GetMarketDetails() {
  const contract = PerpsV2MarketData__factory.connect(PerpsV2MarketDataOP, providerOP)
  const markets = await contract.allProxiedMarketSummaries()

  markets.map(async (x) => {
    const params = await contract.parameters(x.key)
    const mapped: MarketSettings = {
      skewScale: fromBigNumber(params.skewScale),
    }
    global.MARKET_SETTINGS[x.key] = mapped
  })
}

export async function GetMarketSummaries(timestamp?: number | undefined): Promise<MarketSummary[]> {
  let blockTag = undefined

  if (timestamp) {
    try {
      const fromBlock = await getBlockByTimestamp(providerOP, timestamp)
      blockTag = ethers.utils.hexValue(fromBlock)
    } catch (error) {
      console.error('Error fetching block by timestamp:', error)
      throw error
    }
  }

  const contract = PerpsV2MarketData__factory.connect(PerpsV2MarketDataOP, providerOP)
  // const fundingRates = await contract.allProxiedMarketSummaries({ blockTag: blockTag })
  let fundingRates: any[]

  try {
    fundingRates = await contract.allProxiedMarketSummaries({ blockTag })
    // console.debug('Fetched market summaries:', fundingRates)
  } catch (error) {
    console.error('Error fetching market summaries')
    throw error
  }
  
  const rates = fundingRates
    .map((x) => {
      if (!x || !x.market || !x.asset || !x.key || !x.price || !x.marketSize) {
        console.error('Missing data in market summary:', x)
        return null
      }

      try {
        const marketSummary: MarketSummary = {
          market: x.market,
          originalAsset: hexToAscii(x.asset),
          asset: ReplaceSynths(hexToAscii(x.asset)),
          key: hexToAscii(x.key),
          maxLeverage: fromBigNumber(x.maxLeverage),
          price: fromBigNumber(x.price),
          marketSize: fromBigNumber(x.marketSize),
          marketSkew: fromBigNumber(x.marketSkew),
          marketDebt: fromBigNumber(x.marketDebt),
          currentFundingRate: fromBigNumber(x.currentFundingRate),
          currentFundingVelocity: fromBigNumber(x.currentFundingVelocity),
          marketValue: fromBigNumber(x.marketSize) * fromBigNumber(x.price),
          settings: global.MARKET_SETTINGS[x.key],
        }
        return marketSummary
      } catch (error) {
        console.error('Error processing market summary:', error, x)
        return null
      }
    })
    .filter((rate) => rate !== null) as MarketSummary[]

  const sorted = rates.sort((a, b) => {
    if (!a || !b) {
      return 0
    }
    return a.marketValue > b.marketValue ? -1 : 1
  })

  return sorted
}

export async function GetStats(markets: MarketSummary[], asset: string) {
  return markets.find((x) => x.asset.toLowerCase() === asset.toLowerCase())
}

function ReplaceSynths(asset: string) {
  if (asset == 'sETH') {
    return 'ETH'
  }
  if (asset == 'sBTC') {
    return 'BTC'
  }
  return asset
}

async function getBlockByTimestamp(provider: ethers.providers.JsonRpcProvider, timestamp: number) {
  const dater = new EthDater(provider)
  const date = moment.unix(timestamp)

  try {
    const blockResult = await dater.getDate(date, true, false)
    return blockResult.block
  } catch (error) {
    console.error('Error fetching block by timestamp:', error)
    throw error
  }
}
