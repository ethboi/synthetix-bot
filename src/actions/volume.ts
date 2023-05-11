import { wei } from '@synthetixio/wei'
import { SynthetixGraphClient } from '../clients/apolloClient'
import { VOLUME_QUERY } from '../queries'
import { FuturesTrade } from '../synthetix/__generated__/graphql'
import getFuturesTradeData from '../synthetix/utils/getFuturesTradeData'
import { DocumentNode } from 'graphql'

export async function getVolume(prev: boolean) {
  const day = 86400000
  let from = Math.floor((Date.now() - day) / 1000)
  let to = Math.floor(Date.now() / 1000)

  if (prev) {
    from = Math.floor((Date.now() - 2 * day) / 1000)
    to = Math.floor((Date.now() - day) / 1000)
  }

  const result = await paginateGraphQL<FuturesTrade>(VOLUME_QUERY, { from: wei(from, 0), to: wei(to, 0) })

  if (result) {
    const mapped = result.map(getFuturesTradeData)
    const total: number = mapped.reduce((accumulator, trade) => {
      return accumulator + (trade.size < 0 ? Math.abs(trade.size) : trade.size) * trade.price
    }, 0)
    return { total: total, trades: result.length }
  }
}

async function paginateGraphQL<T>(query: DocumentNode, variables: any, pageSize = 1000): Promise<T[]> {
  let results: T[] = []
  let skip = 0

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

    if (!data.length) {
      break
    }

    results = [...results, ...data]
    skip += pageSize
  }

  return results
}
