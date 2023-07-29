import { FuturesTrade } from '../__generated__/graphql'
import { kFuturesTrade } from '../../types/kwenta'
import { wei } from '@synthetixio/wei'
import { hexToAscii } from '../../utils/formatString'

export default function getFuturesTradeData(source: FuturesTrade): kFuturesTrade {
  return {
    abstractAccount: source.abstractAccount,
    account: source.account,
    accountType: source.accountType,
    asset: hexToAscii(source.asset),
    feesPaid: wei(source.feesPaid, 18, true).toNumber(),
    fundingAccrued: wei(source.fundingAccrued, 18, true).toNumber(),
    id: source.id as unknown as number,
    keeperFeesPaid: wei(source.keeperFeesPaid, 18, true).toNumber(),
    margin: wei(source.margin, 18, true).toNumber(),
    marketKey: hexToAscii(source.marketKey),
    orderType: source.orderType,
    pnl: wei(source.pnl, 18, true).toNumber(),
    positionClosed: source.positionClosed,
    positionId: source.positionId,
    positionSize: wei(source.positionSize, 18, true).toNumber(),
    price: wei(source.price, 18, true).toNumber(),
    size: wei(source.size, 18, true).toNumber(),
    timestamp: wei(source.timestamp).toNumber(),
    trackingCode: hexToAscii(source.trackingCode),
  }
}
