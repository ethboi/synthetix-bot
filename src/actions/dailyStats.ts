// import { SynthetixGraphClient } from '../clients/apolloClient'
// import { DAILY_STATS_QUERY } from '../queries'
// import { DailyStat } from '../synthetix/__generated__/graphql'
// import getDailyStatsData from '../synthetix/utils/getDailyStatsData'

// export async function getDailyStats() {
//   const result = await SynthetixGraphClient.query({
//     query: DAILY_STATS_QUERY,
//   })
//   const data = result?.data?.dailyStats as DailyStat[]

//   if (data) {
//     const mapped = data.map(getDailyStatsData)
//     //console.log(mapped)

//     return mapped
//   }
//   return undefined
// }

// dailyStats.ts
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

// async function paginateGraphQL<T>(
//   query: DocumentNode,
//   variables: any,
//   pageSize = 1000,
//   maxRecords = 5000,
// ): Promise<{ results: T[]; lastItem: T }> {
//   let results: T[] = []
//   let skip = 0
//   let lastItem: any = null

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

//     if (!data.length || results.length + data.length > maxRecords) {
//       break
//     }

//     results = [...results, ...data]
//     skip += pageSize

//     if (results.length >= maxRecords) {
//       lastItem = results[results.length - 1]
//       break
//     }
//   }

//   return { results, lastItem }
// }
