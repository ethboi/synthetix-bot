export type MarketSummary = {
  market: string
  asset: string
  key: string
  maxLeverage: number
  price: number
  marketSize: number
  marketSkew: number
  marketDebt: number
  currentFundingRate: number
  currentFundingVelocity: number
}