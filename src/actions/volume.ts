import { SynthetixGraphClient } from '../clients/apolloClient'
import { VOLUME_QUERY_NEW } from '../queries'
import { DailyStat } from '../synthetix/__generated__/graphql'
import getDailyStatsData from '../synthetix/utils/getDailyStatsData'

export async function getVolume() {
  const result = await SynthetixGraphClient.query({
    query: VOLUME_QUERY_NEW,
  })
  if (result) {
    const data = result?.data?.dailyStats as DailyStat[]
    const mapped = data.map(getDailyStatsData)
    console.log(mapped)

    return mapped
  }
}

// async function paginateGraphQL<T>(query: DocumentNode, variables: any, pageSize = 1000): Promise<T[]> {
//   let results: T[] = []
//   let skip = 0

//   // eslint-disable-next-line no-constant-condition
//   while (true) {
//     const response = await SynthetixGraphClient.query({
//       query: query,
//       variables: {
//         ...variables,
//         first: pageSize,
//         skip: skip,
//       },
//     })

//     const data: T[] = response.data.futuresTrades

//     if (!data.length) {
//       break
//     }

//     results = [...results, ...data]
//     skip += pageSize
//   }

//   return results
// }
