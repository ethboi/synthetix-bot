export interface IFundingRate {
  id: string
  market: string
  rate1h: number //1hr
  rate24h: number //24hr
  rate7d: number
  apr: number
  nextFundingTime?: number
  spot?: number
}
