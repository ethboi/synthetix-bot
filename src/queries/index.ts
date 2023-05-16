import { gql } from '@apollo/client/core'

export const VOLUME_QUERY = gql`
  query futuresTrades($from: String!, $to: String!, $first: Int, $skip: Int) {
    futuresTrades(
      orderBy: timestamp
      orderDirection: desc
      where: { timestamp_gt: $from, timestamp_lt: $to }
      first: $first
      skip: $skip
    ) {
      feesPaidToSynthetix
      id
      margin
      market {
        asset
        id
        isActive
        marketKey
        timestamp
      }
      netFunding
      positionClosed
      positionSize
      price
      realizedPnl
      size
      timestamp
      txHash
      type
    }
  }
`

export const DAILY_STATS_QUERY = gql`
  query dailyStats {
    dailyStats(orderBy: timestamp, orderDirection: desc, first: 7) {
      cumulativeFees
      cumulativeTraders
      cumulativeTrades
      cumulativeVolume
      day
      existingTraders
      fees
      id
      newTraders
      timestamp
      trades
      volume
    }
  }
`
