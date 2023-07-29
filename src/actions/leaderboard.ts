import { FuturesStat } from '../kwenta/__generated__/graphql'
import { KwentGraphClient } from '../clients/apolloClient'
import { GET_LEADERBOARD } from '../queries/kwenta/trades'
import { getFuturesStatsData } from '../kwenta/utils/getSmartMarginAccountData'
import { isEmpty } from '../utils/utils'

export async function GetLeaderBoard(top = true) {
  let orderDirection = 'desc'

  if (!top) {
    orderDirection = 'asc'
  }

  const result = await KwentGraphClient.query({
    query: GET_LEADERBOARD,
    variables: {
      orderDirection: orderDirection,
    },
  })

  if (result.data?.futuresStats && !isEmpty(result.data?.futuresStats)) {
    const futuresStats = (result.data?.futuresStats as FuturesStat[]).map(getFuturesStatsData)
    console.log(result.data?.futuresStats)
    return futuresStats
  }

  return undefined
}
