import { alchemyProvider } from '../utils/providers'
import RpcClient from '../utils/rpcClient'
import { PerpsV2MarketData__factory } from '../contracts/typechain'
import { PerpsV2FundingDataContractAddress } from '../constants/addresses'
import printObject from '../utils/printObject'
import { MarketSummary } from '../types'
import { hexToAscii } from '../utils/formatString'
import fromBigNumber from '../utils/fromBigNumber'

export async function GetMarketSummaries() {
  console.log('Getting Funding Rates')
  const rpcClient = new RpcClient(alchemyProvider)
  const contract = PerpsV2MarketData__factory.connect(PerpsV2FundingDataContractAddress, rpcClient.provider)
  const fundingRates = await contract.allProxiedMarketSummaries()

  //market: string;
  //asset: string;
  //key: string;
  //maxLeverage: BigNumber;
  //price: BigNumber;
  //marketSize: BigNumber;
  //marketSkew: BigNumber;
  //marketDebt: BigNumber;
  //currentFundingRate: BigNumber;
  //currentFundingVelocity: BigNumber;
  //feeRates: PerpsV2MarketData.FeeRatesStructOutput;

  const rates = fundingRates.map((x) => {
    const marketSummary: MarketSummary = {
      market: x.market,
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
    }

    return marketSummary
  })
  const sorted = rates.sort((a, b) => (a.marketValue > b.marketValue ? -1 : 1))
  return sorted
}

export async function GetStats(markets: MarketSummary[], asset: string) {
  console.log(`stats for ${asset.toLowerCase()}`)
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
