import { BINANCE } from '../providers/binance'
import { BYBIT } from '../providers/bybit'
import { DYDX } from '../providers/dydx'
import { SYNTHETIX } from '../providers/synthetix'
import { ProviderType } from '../types/arbitrage'
import { BYBIT_API_KEY, BYBIT_API_SECRET } from '../config'
import { IFundingRate } from '../models/funding-rate'

export async function getFundingRates(market: string | undefined = undefined) {
  const [synthetix, dydx, bybit, binance] = await Promise.all([
    new SYNTHETIX().getFundingRates(),
    new DYDX().getFundingRates(),
    new BYBIT(BYBIT_API_KEY, BYBIT_API_SECRET).getFundingRates(),
    new BINANCE().getFundingRates(),
  ])

  const rates: { [key: string]: IFundingRate[] } = {
    [ProviderType.SYNTHETIX]: synthetix,
    [ProviderType.DYDX]: dydx,
    [ProviderType.BYBIT]: bybit,
    [ProviderType.BINANCE]: binance,
  }

  // market set
  if (market) {
    market = market.toUpperCase()
    const marketRate: { [key: string]: IFundingRate[] } = {}
    for (const [key, value] of Object.entries(rates)) {
      marketRate[key] = value.filter((obj) => obj.id === market)
    }
    return marketRate
  }

  // take the top 10 Popular Markets
  const popularRates: { [key: string]: IFundingRate[] } = {}
  for (const [key, value] of Object.entries(rates)) {
    popularRates[key] = value.filter((obj) => SELECTED_MARKETS.includes(obj.id))
  }
  return popularRates
}

export const SELECTED_MARKETS = ['ETH', 'BTC', 'ARB', 'AVAX', 'LINK', 'OP', 'MATIC', 'UNI']
