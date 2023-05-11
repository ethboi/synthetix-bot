import { FuturesMarket } from '../__generated__/graphql'
import { sFuturesMarket } from '../../types/synthetix'
import { wei } from '@synthetixio/wei'
import { hexToAscii } from '../../utils/formatString'

export default function getFuturesMarketData(source: FuturesMarket): sFuturesMarket {
  return {
    asset: hexToAscii(source.asset),
    id: source.id,
    isActive: source.isActive,
    marketKey: hexToAscii(source.marketKey),
    timestamp: wei(source.timestamp).toNumber(),
  }
}
