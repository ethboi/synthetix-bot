import { wei } from '@synthetixio/wei'
import { SynthetixGraphClient } from '../clients/apolloClient'
import { VOLUME_QUERY } from '../queries'
import { FuturesTrade } from '../synthetix/__generated__/graphql'
import getFuturesTradeData from '../synthetix/utils/getFuturesTradeData'
import { DocumentNode } from 'graphql'

export async function getFees(isDay: boolean) {
  const day = 86400000
  const week = day * 7
  let from = Math.floor((Date.now() - week) / 1000)
  let to = Math.floor(Date.now() / 1000)

  if (isDay) {
    from = Math.floor((Date.now() - day) / 1000)
    to = Math.floor(Date.now() / 1000)
  }
  let allResults: FuturesTrade[] = []

  // eslint-disable-next-line no-constant-condition
  while (true) {
    console.log(`From ${from} - To ${to}`)
    const { results, lastItem } = await paginateGraphQL<FuturesTrade>(VOLUME_QUERY, {
      from: wei(from, 0),
      to: wei(to, 0),
    })
    console.log(results.length)
    allResults = [...allResults, ...results]
    if (!lastItem) {
      break
    }
    to = wei((lastItem as FuturesTrade).timestamp).toNumber()
  }

  if (allResults) {
    const mapped = allResults.map(getFuturesTradeData)
    const total: number = mapped.reduce((accumulator, trade) => {
      return accumulator + trade.feesPaidToSynthetix
    }, 0)
    console.log(`Trade Count: ${allResults.length}`)
    if (isDay) {
      console.log(`Daily Fees: ${total}`)
    } else {
      console.log(`Weekly Fees: ${total}`)
    }
    return { fees: total }
  }
}

async function paginateGraphQL<T>(
  query: DocumentNode,
  variables: any,
  pageSize = 1000,
  maxRecords = 5000,
): Promise<{ results: T[]; lastItem: T }> {
  let results: T[] = []
  let skip = 0
  let lastItem: any = null

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const response = await SynthetixGraphClient.query({
      query: query,
      variables: {
        ...variables,
        first: pageSize,
        skip: skip,
      },
    })

    const data: T[] = response.data.futuresTrades

    if (!data.length || results.length + data.length > maxRecords) {
      break
    }

    results = [...results, ...data]
    skip += pageSize

    if (results.length >= maxRecords) {
      lastItem = results[results.length - 1]
      break
    }
  }

  return { results, lastItem }
}
