import { FuturesPosition } from '../__generated__/graphql'
import { sFuturesPosition } from '../../types/synthetix'
import { wei } from '@synthetixio/wei'

export default function getFuturesPositionData(source: FuturesPosition): sFuturesPosition {
  return {
    avgEntryPrice: source?.avgEntryPrice ? wei(source.avgEntryPrice, 18, true).toNumber() : undefined,
    closeTimestamp: source?.closeTimestamp ? wei(source?.closeTimestamp).toNumber() : undefined,
    entryPrice: source?.entryPrice ? wei(source.entryPrice, 18, true).toNumber() : undefined,
    exitPrice: source?.exitPrice ? wei(source?.exitPrice, 18, true).toNumber() : undefined,
    feesPaidToSynthetix: wei(source.feesPaidToSynthetix, 18, true).toNumber(),
    fundingIndex: wei(source.fundingIndex, 18, true).toNumber(),
    id: source.id,
    initialMargin: wei(source.initialMargin, 18, true).toNumber(),
    isLiquidated: source.isLiquidated,
    isOpen: source.isOpen,
    lastPrice: wei(source.lastPrice, 18, true).toNumber(),
    leverage: wei(source.leverage, 18, true).toNumber(),
    long: source.long,
    margin: wei(source.margin, 18, true).toNumber(),
    netFunding: wei(source.netFunding, 18, true).toNumber(),
    netTransfers: wei(source.netTransfers, 18, true).toNumber(),
    openTimestamp: wei(source.openTimestamp).toNumber(),
    realizedPnl: wei(source.realizedPnl, 18, true).toNumber(),
    size: wei(source.size, 18, true).toNumber(),
    skew: source.skew ? wei(source.skew, 18, true).toNumber() : undefined,
    totalVolume: wei(source.totalVolume, 18, true).toNumber(),
    txHash: source.txHash,
    unrealizedPnl: wei(source.unrealizedPnl, 18, true).toNumber(),
  }
}
