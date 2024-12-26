import { SynthetixGraphClient } from '../clients/apolloClient'
import { DAILY_STATS_QUERY } from '../queries/index'
import { DailyStat } from '../synthetix/__generated__/graphql'
import getDailyStatsData from '../synthetix/utils/getDailyStatsData'

export async function getDailyStats() {
  const result = await SynthetixGraphClient.query({
    query: DAILY_STATS_QUERY,
  })
  const data = result?.data?.dailyStats as DailyStat[]

  if (data) {
    const mapped = data.map(getDailyStatsData)
    //console.log(mapped)

    return mapped
  }
  return undefined
}