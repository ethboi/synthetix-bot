import { Trader } from '../__generated__/graphql'
import { sTrader } from '../../types/synthetix'
import { wei } from '@synthetixio/wei'

export default function getTraderData(source: Trader): sTrader {
  return {
    feesPaidToSynthetix: wei(source.feesPaidToSynthetix, 18, true).toNumber(),
    id: source.id,
    margin: wei(source.margin, 18, true).toNumber(),
    realizedPnl: wei(source.realizedPnl, 18, true).toNumber(),
    totalLiquidations: wei(source.totalLiquidations).toNumber(),
    totalMarginLiquidated: wei(source.totalMarginLiquidated, 18, true).toNumber(),
    totalVolume: wei(source.totalVolume, 18, true).toNumber(),
  }
}
