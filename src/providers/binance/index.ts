import axios from 'axios'
import { IFundingRate } from '../../models/funding-rate'
import { Exchange } from '../common'
import { createHmac } from 'node:crypto'

export class BINANCE extends Exchange {
  constructor(apiKey?: string, apiSecret?: string) {
    super(apiKey, apiSecret)
    this._name = 'BINANCE'
    this._baseUrl = 'https://fapi.binance.com/fapi/v1/'
  }

  async getFundingRates(): Promise<IFundingRate[]> {
    const timestamp = Date.now().toString()
    const signString = ''
    const signature = createHmac('sha256', this._apiSecret).update(signString).digest('hex')
    const headers = {
      'Content-Type': 'application/json',
      'api-key': this._apiKey,
      timestamp: timestamp,
      sign: signature,
    }

    return await axios.get<IBinanceFundingRate[]>(`${this._baseUrl}premiumIndex`, { headers }).then((response) => {
      const results: IFundingRate[] = []
      if (response.data) {
        response.data.map((market) => {
          const baseRate = market.lastFundingRate // 8 hour
          const result: IFundingRate = {
            id: this.getId(market.symbol),
            market: market.symbol,
            rate1h: (baseRate / 8) * 100,
            rate24h: baseRate * 3 * 100,
            rate7d: baseRate * 3 * 7 * 100,
            apr: baseRate * 3 * 364 * 100,
            nextFundingTime: new Date(market.nextFundingTime).getTime(),
          }
          //only USDT
          if (result.market.endsWith('USDT')) {
            results.push(result)
          }
        })
      }
      return results
    })
  }

  getId(symbol: string) {
    const index = symbol.lastIndexOf('USDT')

    if (index !== -1) {
      return symbol.substring(0, index)
    }
    return symbol
  }
}

interface IBinanceFundingRate {
  symbol: string
  markPrice: number
  indexPrice: number
  lastFundingRate: number
  nextFundingTime: Date
  interestRate: number
  time: Date
}
