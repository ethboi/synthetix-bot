import { IFundingRate } from '../../models/funding-rate'

export abstract class Exchange {
  protected _apiKey: string
  protected _apiSecret: string
  protected _name: string | undefined
  protected _baseUrl: string | undefined

  get name() {
    return this._name
  }

  constructor(apiKey?: string, apiSecret?: string) {
    this._apiKey = apiKey ? apiKey : ''
    this._apiSecret = apiSecret ? apiSecret : ''
  }

  abstract getFundingRates(): Promise<IFundingRate[]>
}
