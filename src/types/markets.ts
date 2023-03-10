export type MarketSummary = {
  market: string
  asset: string
  key: string
  maxLeverage: number
  price: number
  marketSize: number
  marketValue: number
  marketSkew: number
  marketDebt: number
  currentFundingRate: number
  currentFundingVelocity: number
  settings: MarketSettings | undefined
}

export type MarketSettings = {
  skewScale: number
}
