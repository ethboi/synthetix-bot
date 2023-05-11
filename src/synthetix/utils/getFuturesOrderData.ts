import { FuturesOrder } from '../__generated__/graphql'
import { sFuturesOrder } from '../../types/synthetix'
import { wei } from '@synthetixio/wei'
import getFuturesPositionData from './getFuturesPositionData'

export default function getFuturesOrderData(source: FuturesOrder): sFuturesOrder {
  return {
    fee: wei(source.fee, 18, true).toNumber(),
    futuresPosition: source.futuresPosition ? getFuturesPositionData(source.futuresPosition) : undefined,
    id: source.id,
    keeper: source.keeper,
    marginDelta: wei(source.marginDelta, 18, true).toNumber(),
    orderId: wei(source.orderId, 18, true).toNumber(),
    orderType: source.orderType,
    size: wei(source.size, 18, true).toNumber(),
    status: source.status,
    targetPrice: wei(source.targetPrice, 18, true).toNumber(),
    targetRoundId: wei(source.targetRoundId, 18, true).toNumber(),
    timestamp: wei(source.timestamp).toNumber(),
    txHash: source.txHash,
  }
}
