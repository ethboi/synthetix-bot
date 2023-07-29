import { FuturesStat, SmartMarginAccount } from '../__generated__/graphql'
import { kFutureStat, kSmartMarginAccount } from '../../types/kwenta'
import { wei } from '@synthetixio/wei'
import { weiFromWei } from '../../utils/fromWei'

export function getSmartMarginAccountData(source: SmartMarginAccount): kSmartMarginAccount {
  return {
    id: source.id,
    owner: source.owner,
  }
}

export function getFuturesStatsData(source: FuturesStat): kFutureStat {
  return {
    owner: source.account,
    feesPaid: wei(source.feesPaid, 18, true).toNumber(),
    id: source.id,
    liquidations: wei(source.liquidations).toNumber(),
    pnl: wei(source.pnlWithFeesPaid, 18, true).toNumber(),
    smartMarginVolume: wei(source.smartMarginVolume, 18, true).toNumber(),
    totalTrades: wei(source.totalTrades).toNumber(),
    totalVolume: weiFromWei(source.totalVolume).toNumber(),
  }
}
