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
