import { GetMarketSummaries } from '.'
import { MarketSummary } from '../types/markets'

export async function GetOpenInterest(prev: boolean) {
  const day = 86400000
  let markets: MarketSummary[] = []

  if (prev) {
    const prevDay = Math.floor((Date.now() - day) / 1000)
    markets = await GetMarketSummaries(prevDay)
  } else {
    markets = await GetMarketSummaries()
  }

  const openInterest = markets.reduce((accumulator, market) => {
    return accumulator + market.marketValue
  }, 0)

  return openInterest
}
