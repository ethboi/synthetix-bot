import { wei } from '@synthetixio/wei'
import { sDailyStat } from '../../types/synthetix'
import { DailyStat } from '../__generated__/graphql'

export default function getDailyStatsData(source: DailyStat): sDailyStat {
  return {
    cumulativeFees: wei(source.cumulativeFees, 18, true).toNumber(),
    cumulativeTraders: wei(source.cumulativeTraders).toNumber(),
    cumulativeTrades: wei(source.cumulativeTrades).toNumber(),
    cumulativeVolume: wei(source.cumulativeVolume, 18, true).toNumber(),
    day: source.day,
    existingTraders: wei(source.existingTraders).toNumber(),
    fees: wei(source.fees, 18, true).toNumber(),
    id: source.id,
    newTraders: wei(source.newTraders, 18).toNumber(),
    timestamp: wei(source.timestamp).toNumber(),
    trades: wei(source.trades).toNumber(),
    volume: wei(source.volume, 18, true).toNumber(),
  }
}
