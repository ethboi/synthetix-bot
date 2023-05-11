import { FuturesTrade } from '../__generated__/graphql'
import { sFuturesTrade } from '../../types/synthetix'
import { wei } from '@synthetixio/wei'
import getFuturesMarketData from './getFuturesMarketData'
import getFuturesPositionData from './getFuturesPositionData'
import getFuturesOrderData from './getFuturesOrderData'

export default function getFuturesTradeData(source: FuturesTrade): sFuturesTrade {
  return {
    feesPaidToSynthetix: wei(source.feesPaidToSynthetix, 18, true).toNumber(),
    futuresOrder: source?.futuresOrder ? getFuturesOrderData(source?.futuresOrder) : undefined,
    futuresPosition: source?.futuresPosition ? getFuturesPositionData(source?.futuresPosition) : undefined,
    id: source.id,
    margin: wei(source.margin, 18, true).toNumber(),
    market: getFuturesMarketData(source.market),
    netFunding: wei(source.netFunding, 18, true).toNumber(),
    positionClosed: source.positionClosed,
    positionSize: wei(source.positionSize, 18, true).toNumber(),
    price: wei(source.price, 18, true).toNumber(),
    realizedPnl: wei(source.realizedPnl, 18, true).toNumber(),
    size: wei(source.size, 18, true).toNumber(),
    timestamp: wei(source.timestamp).toNumber(),
    txHash: source.txHash,
    type: source.type,
  }
}
