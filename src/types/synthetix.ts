import { FuturesOrderStatus, FuturesOrderType, FuturesTradeType } from '../synthetix/__generated__/graphql'

export type sTrader = {
  feesPaidToSynthetix: number
  id: string
  margin: number
  realizedPnl: number
  totalLiquidations: number
  totalMarginLiquidated: number
  totalVolume: number
  trades?: sFuturesTrade[]
}

export type sFuturesTrade = {
  feesPaidToSynthetix: number
  futuresOrder?: sFuturesOrder
  futuresPosition?: sFuturesPosition
  id: string
  margin: number
  market?: sFuturesMarket
  netFunding: number
  positionClosed: boolean
  positionSize: number
  price: number
  realizedPnl: number
  size: number
  timestamp: number
  txHash: string
  type: FuturesTradeType
}

export type sFuturesMarket = {
  asset: string
  id: string
  isActive: boolean
  marketKey: string
  timestamp: number
}

export type sFuturesOrder = {
  fee: number
  futuresPosition?: sFuturesPosition
  id: string
  keeper: string
  marginDelta: number
  orderId: number
  orderType: FuturesOrderType
  size: number
  status: FuturesOrderStatus
  targetPrice: number
  targetRoundId: number
  timestamp: number
  txHash: string
}

export type sFuturesPosition = {
  avgEntryPrice?: number
  closeTimestamp?: number
  entryPrice?: number
  exitPrice?: number
  feesPaidToSynthetix: number
  fundingIndex: number
  id: string
  initialMargin: number
  isLiquidated: boolean
  isOpen: boolean
  lastPrice: number
  leverage: number
  long: boolean
  margin: number
  netFunding: number
  netTransfers: number
  openTimestamp: number
  realizedPnl: number
  size: number
  skew?: number
  totalVolume: number
  txHash: string
  unrealizedPnl: number
}

export type sDailyStat = {
  cumulativeFees: number
  cumulativeTraders: number
  cumulativeTrades: number
  cumulativeVolume: number
  day: string
  existingTraders: number
  fees: number
  id: string
  newTraders: number
  timestamp: number
  trades: number
  volume: number
}

export type baseDailyStat = {
  volume: number
}


export type arbDailyStat = {
  volume: number
}