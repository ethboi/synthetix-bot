import axios from 'axios'
import { IFundingRate } from '../../models/funding-rate'
import { Exchange } from '../common'
import { createHmac } from 'node:crypto'

export class BYBIT extends Exchange {
  constructor(apiKey?: string, apiSecret?: string) {
    super(apiKey, apiSecret)
    this._name = 'BYBIT'
    this._baseUrl = 'https://api.bybit.com/v5/'
  }

  async getFundingRates(): Promise<IFundingRate[]> {
    const timestamp = Date.now().toString()
    const recv_window = '5000'
    const params: { [key: string]: string } = {
      category: 'linear',
    }

    let orderedParams = ''
    Object.keys(params)
      .sort()
      .forEach(function (key) {
        orderedParams += `${key}=${params[key] as string}&`
      })
    orderedParams = orderedParams.substring(0, orderedParams.length - 1)

    const signString = `${timestamp}${this._apiKey}${recv_window}${orderedParams}`
    const signature = createHmac('sha256', this._apiSecret).update(signString).digest('hex')
    const headers = {
      'Content-Type': 'application/json',
      'api-key': this._apiKey,
      timestamp: timestamp,
      sign: signature,
    }

    return await axios.get<BybitData>(`${this._baseUrl}market/tickers`, { headers, params }).then((response) => {
      const results: IFundingRate[] = []
      if (response.data.retMsg == 'OK' && response.data.result && response.data.result.list.length > 0) {
        const data = response.data.result.list
        data.map((market) => {
          if (market.symbol.endsWith('USDT')) {
            const baseRate = Number(market.fundingRate) // 8hr
            const result: IFundingRate = {
              id: this.getId(market.symbol),
              market: market.symbol,
              rate1h: (baseRate / 8) * 100,
              rate24h: baseRate * 3 * 100,
              rate7d: baseRate * 3 * 7 * 100,
              apr: baseRate * 3 * 364 * 100,
              nextFundingTime: Number(market.nextFundingTime),
            }
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

export interface BybitData {
  retCode: number
  retMsg: string
  result: Result
  time: number
}

export interface Result {
  category: string
  list: List[]
}

export interface List {
  symbol: string
  lastPrice: string
  indexPrice: string
  markPrice: string
  prevPrice24h: string
  price24hPcnt: string
  highPrice24h: string
  lowPrice24h: string
  prevPrice1h: string
  openInterest: string
  openInterestValue: string
  turnover24h: string
  volume24h: string
  fundingRate: string
  nextFundingTime: string
  predictedDeliveryPrice: PredictedDeliveryPrice
  basisRate: string
  deliveryFeeRate: string
  deliveryTime: string
  ask1Size: string
  bid1Price: string
  ask1Price: string
  bid1Size: string
  basis: string
}

export enum PredictedDeliveryPrice {
  Empty = '',
  The000 = '0.00',
}
