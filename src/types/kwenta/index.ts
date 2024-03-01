import { FuturesAccountType, FuturesOrderType } from '../../kwenta/__generated__/graphql'

export type kFuturesTrade = {
  abstractAccount: string
  account: string
  accountType: FuturesAccountType
  asset: string
  feesPaid: number
  fundingAccrued: number
  id: number
  keeperFeesPaid: number
  margin: number
  marketKey: string
  orderType: FuturesOrderType
  pnl: number
  positionClosed: boolean
  positionId: string
  positionSize: number
  price: number
  size: number
  timestamp: number
  trackingCode: string
}

export type kSmartMarginAccount = {
  id: string
  owner: string
}

export type kFutureStat = {
  owner?: string
  smartWallet?: string
  ens?: string
  feesPaid: number
  id: string
  liquidations: number
  pnl: number
  smartMarginVolume: number
  totalTrades: number
  totalVolume: number
  trades?: kFuturesTrade[]
  position?: number
}

export type BuyBackResponse = {
  status: string
  message: string
  result: BuyBackResult[] | string
}

export type BuyBackResult = {
  address: string
  topics: string[]
  data: string
  blockNumber: string
  blockHash: string
  timeStamp: string
  gasPrice: string
  gasUsed: string
  logIndex: string
  transactionHash: string
  transactionIndex: string
}
