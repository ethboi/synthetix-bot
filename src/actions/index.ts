import { alchemyProvider } from '../utils/providers'
import RpcClient from '../utils/rpcClient'
import { PerpsV2MarketData__factory } from '../contracts/typechain'
import { PerpsV2FundingDataContractAddress } from '../constants/addresses'
import { MarketSettings, MarketSummary } from '../types/markets'
import { hexToAscii } from '../utils/formatString'
import fromBigNumber from '../utils/fromBigNumber'
import { ethers } from 'ethers'
import EthDater from 'ethereum-block-by-date'
import moment from 'moment'

export async function GetMarketDetails() {
  const rpcClient = new RpcClient(alchemyProvider)
  const contract = PerpsV2MarketData__factory.connect(PerpsV2FundingDataContractAddress, rpcClient.provider)
  const markets = await contract.allProxiedMarketSummaries()

  markets.map(async (x) => {
    const params = await contract.parameters(x.key)
    const mapped: MarketSettings = {
      skewScale: fromBigNumber(params.skewScale),
    }
    global.MARKET_SETTINGS[x.key] = mapped
  })
}

export async function GetMarketSummaries(timestamp?: number | undefined) {
  let blockTag = undefined
  const rpcClient = new RpcClient(alchemyProvider)
  if (timestamp) {
    const fromBlock = await getBlockByTimestamp(rpcClient.provider, timestamp)
    blockTag = ethers.utils.hexValue(fromBlock)
  }

  const contract = PerpsV2MarketData__factory.connect(PerpsV2FundingDataContractAddress, rpcClient.provider)
  const fundingRates = await contract.allProxiedMarketSummaries({ blockTag: blockTag })

  // Log the entire fundingRates array for debugging
  // console.log('Funding Rates:', JSON.stringify(fundingRates, null, 2))

  const rates = fundingRates.map((x) => {
    if (!x || !x.market || !x.asset || !x.key || !x.price || !x.marketSize) {
      console.error('Missing data in market summary:', x)
      return null
    }

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
  }).filter((rate) => rate !== null)

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
  const blockResult = await dater.getDate(date, true, false)
  return blockResult.block
}
