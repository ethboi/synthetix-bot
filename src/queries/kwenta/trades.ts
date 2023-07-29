import { gql } from '@apollo/client/core'

export const TRADES_QUERY = gql`
  query getTrades($id: String!) {
    futuresTrades(first: 6, orderBy: timestamp, orderDirection: desc, where: { abstractAccount: $id }) {
      id
      timestamp
      account
      abstractAccount
      accountType
      asset
      feesPaid
      fundingAccrued
      keeperFeesPaid
      margin
      marketKey
      orderType
      pnl
      positionClosed
      positionId
      positionSize
      price
      size
      trackingCode
    }
  }
`
export const GET_OWNER_QUERY = gql`
  query getSmartMarginAccount($id: String!) {
    smartMarginAccount(id: $id) {
      id
      owner
    }
  }
`

export const GET_SMARTWALLET_QUERY = gql`
  query smartMarginAccounts($owner: String!) {
    smartMarginAccounts(where: { owner: $owner }) {
      id
      owner
      version
    }
  }
`

export const GET_FUTURES_STATS = gql`
  query futuresStats($id: String!) {
    futuresStats(where: { account: $id }) {
      account
      pnl
      pnlWithFeesPaid
      liquidations
      totalTrades
      totalVolume
      feesPaid
      smartMarginVolume
    }
  }
`

export const GET_TRADE_FEED = gql`
  query getTrades($from: String!, $to: String!) {
    futuresTrades(orderBy: timestamp, orderDirection: asc, where: { timestamp_gt: $from, timestamp_lt: $to }) {
      id
      timestamp
      account
      abstractAccount
      accountType
      asset
      feesPaid
      fundingAccrued
      keeperFeesPaid
      margin
      marketKey
      orderType
      pnl
      positionClosed
      positionId
      positionSize
      price
      size
      trackingCode
    }
  }
`

export const GET_LEADERBOARD = gql`
  query futuresStats($orderDirection: String!) {
    futuresStats(orderBy: pnlWithFeesPaid, orderDirection: $orderDirection, first: 15) {
      account
      pnl
      pnlWithFeesPaid
      liquidations
      totalTrades
      totalVolume
      feesPaid
      smartMarginVolume
    }
  }
`
