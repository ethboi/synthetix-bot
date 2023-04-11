import { IFundingRate } from '../models/funding-rate'

export enum ProviderType {
  SYNTHETIX = 'SYNTHETIX',
  DYDX = 'DYDX',
  BYBIT = 'BYBIT',
  BINANCE = 'BINANCE',
}

export type ProviderRates = {
  [key: string]: IFundingRate[]
}
