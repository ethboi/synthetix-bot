import { FuturesStat, FuturesTrade, SmartMarginAccount } from '../kwenta/__generated__/graphql'
import { KwentGraphClient } from '../clients/apolloClient'
import { GET_SMARTWALLET_QUERY, GET_OWNER_QUERY, TRADES_QUERY, GET_FUTURES_STATS } from '../queries/kwenta/trades'
import getFuturesTradeData from '../kwenta/utils/getFuturesTradeData'
import { isValidEnsAddress } from '../utils/validENS'
import { GetEns, ResolveEns } from '../integrations/ens'
import { getFuturesStatsData, getSmartMarginAccountData } from '../kwenta/utils/getSmartMarginAccountData'
import { kFutureStat } from '../types/kwenta'
import { isEmpty } from '../utils/utils'
import { isAddress } from 'ethers/lib/utils'

export async function getTrader(input: string): Promise<kFutureStat | undefined> {
  let owner = ''
  let smartWallet = ''
  let ens = ''

  // need to determine if smart wallet or owner

  if (isValidEnsAddress(input)) {
    // get the account
    console.log(`Valid ENS - get the wallet address. ${input}`)
    ens = input
    owner = await ResolveEns(ens)
    // now get the smartwallet
    const smartMarginAccount = await getSmartWallet(owner)
    console.log(smartMarginAccount)
    if (isEmpty(smartMarginAccount) || !smartMarginAccount) {
      // owner has no smart margin account
      return undefined
    }
    // found so assign
    smartWallet = smartMarginAccount[0].id
    console.log(`smart wallet: ${smartWallet}`)
  } else {
    console.log('INVALID ENS - getting the ens.')

    if (!isAddress(input)) {
      return undefined
    }

    ens = await GetEns(input)
    console.log(ens)
    // now could be smart wallet or owner
    // input is smartwallet? get owner
    const ownerAcc = await getOwner(input)

    if (ownerAcc) {
      owner = ownerAcc.owner
      smartWallet = ownerAcc.id
    } else {
      // input is owner? get smartwallet
      const smartWalletAcc = await getSmartWallet(input)
      //console.log(smartWalletAcc)
      if (isEmpty(smartWalletAcc) || !smartWalletAcc) {
        // owner has no smart margin account
        return undefined
      }
      smartWallet = smartWalletAcc[0].id
      owner = smartWalletAcc[0].owner
    }
  }

  const result = await KwentGraphClient.query({
    query: GET_FUTURES_STATS,
    variables: {
      id: owner.toLowerCase(),
    },
  })

  if (result.data?.futuresStats && !isEmpty(result.data?.futuresStats)) {
    const futuresStat = (result.data?.futuresStats as FuturesStat[]).map(getFuturesStatsData)[0]
    futuresStat.trades = await getTrades(smartWallet)
    futuresStat.ens = ens
    futuresStat.owner = owner
    futuresStat.smartWallet = smartWallet

    console.log(futuresStat)
    return futuresStat
  }

  return undefined
}

export async function getTrades(address: string) {
  const result = await KwentGraphClient.query({
    query: TRADES_QUERY,
    variables: {
      id: address.toLowerCase(),
    },
  })

  if (result.data?.futuresTrades) {
    return (result.data.futuresTrades as FuturesTrade[]).map(getFuturesTradeData)
  }

  return undefined
}

// pass in smart wallet to get owner
export async function getOwner(smartWallet: string) {
  const result = await KwentGraphClient.query({
    query: GET_OWNER_QUERY,
    variables: {
      id: smartWallet.toLowerCase(),
    },
  })

  if (result.data?.smartMarginAccount) {
    return getSmartMarginAccountData(result.data.smartMarginAccount as SmartMarginAccount)
  }

  return undefined
}

// pass in owner to get smart wallet
export async function getSmartWallet(owner: string) {
  const result = await KwentGraphClient.query({
    query: GET_SMARTWALLET_QUERY,
    variables: {
      owner: owner.toLowerCase(),
    },
  })

  if (result.data?.smartMarginAccounts) {
    return (result.data.smartMarginAccounts as SmartMarginAccount[]).map(getSmartMarginAccountData)
  }

  return undefined
}
