import { IFundingRate } from '../../models/funding-rate'
import { Exchange } from '../common'
import { GetMarketSummaries } from '../../actions'

export class SYNTHETIX extends Exchange {
  constructor(apiKey?: string, apiSecret?: string) {
    super(apiKey, apiSecret)
    this._name = 'SYNTHETIX'
    this._baseUrl = ''
  }

  async getFundingRates(): Promise<IFundingRate[]> {
    const markets = await GetMarketSummaries()
    const responses: IFundingRate[] = []

    markets.map(async (market) => {
      const rates: IFundingRate = {
        id: market.asset,
        market: market.key,
        rate1h: (market.currentFundingRate * 100) / 24,
        rate24h: market.currentFundingRate * 100,
        rate7d: market.currentFundingRate * 100 * 7,
        apr: market.currentFundingRate * 365 * 100,
        spot: market.price,
      }
      if (rates) {
        responses.push(rates)
      }
    })

    return responses
  }
}
