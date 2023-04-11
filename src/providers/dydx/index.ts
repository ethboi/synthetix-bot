import axios from 'axios'
import { IFundingRate } from '../../models/funding-rate'
import { Exchange } from '../common'

export class DYDX extends Exchange {
  constructor(apiKey?: string, apiSecret?: string) {
    super(apiKey, apiSecret)
    this._name = 'DYDX'
    this._baseUrl = 'https://api.dydx.exchange/v3/'
  }

  async getFundingRates(): Promise<IFundingRate[]> {
    return await this.getFundingFromMarkets()
  }

  async getFundingFromMarkets(): Promise<IFundingRate[]> {
    return await axios.get<DydxData>(`${this._baseUrl}markets`).then((response) => {
      const fundingRates: IFundingRate[] = []

      Object.values(response.data.markets).map((market) => {
        const baseRate = Number(market.nextFundingRate) // 1hr

        const result: IFundingRate = {
          id: market.baseAsset,
          market: market.market,
          rate1h: baseRate * 100,
          rate24h: baseRate * 100 * 24,
          rate7d: baseRate * 100 * 24 * 7,
          apr: baseRate * 24 * 365 * 100,
          nextFundingTime: new Date(market.nextFundingAt).getTime(),
        }
        if (market.type == Type.Perpetual) {
          fundingRates.push(result)
        }
      })
      return fundingRates
    })
  }
}

//   async getFundingRateByMarket(market: IMarket): Promise<IFundingRate> {
//     return await axios
//       .get<IdYdXHistoricalFundingResponse>(`${this._baseUrl}historical-funding/${market.market}`)
//       .then((response) => {
//         const result: IFundingRate = {
//           id: `${market.base}`,
//           symbol: `${market.market}`,
//           rate: Number(response.data.historicalFunding[0].rate),
//         }
//         return result
//       })
//   }
// }

interface IdYdXHistoricalFunding {
  market: string
  rate: number
  price: number
  qffectiveAt: Date
}

interface IdYdXHistoricalFundingResponse {
  historicalFunding: IdYdXHistoricalFunding[]
}

interface IMarket {
  market: string
  base: string
  quote: string
  type: string
}

export interface DydxData {
  markets: { [key: string]: Market }
}

export interface Market {
  market: string
  status: Status
  baseAsset: string
  quoteAsset: QuoteAsset
  stepSize: string
  tickSize: string
  indexPrice: string
  oraclePrice: string
  priceChange24H: string
  nextFundingRate: string
  nextFundingAt: Date
  minOrderSize: string
  type: Type
  initialMarginFraction: string
  maintenanceMarginFraction: string
  transferMarginFraction: string
  volume24H: string
  trades24H: string
  openInterest: string
  incrementalInitialMarginFraction: string
  incrementalPositionSize: string
  maxPositionSize: string
  baselinePositionSize: string
  assetResolution: string
  syntheticAssetId: string
}

export enum QuoteAsset {
  Usd = 'USD',
}

export enum Status {
  CloseOnly = 'CLOSE_ONLY',
  Online = 'ONLINE',
}

export enum Type {
  Perpetual = 'PERPETUAL',
}
