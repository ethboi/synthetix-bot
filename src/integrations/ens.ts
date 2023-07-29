import { alchemyProviderMainnet } from '../utils/providers'
import RpcClient from '../utils/rpcClient'

export async function GetEns(account: string | undefined): Promise<string> {
  if (account == undefined) {
    return ''
  }
  const rpcClient = new RpcClient(alchemyProviderMainnet)

  console.debug(`Getting ens for ${account}`)
  const found = global.ENS[account.toLowerCase()]

  if (found || found === '') {
    console.debug('found ' + found)
    return found
  }

  const ens = await rpcClient.provider.lookupAddress(account)

  if (ens) {
    global.ENS[account] = ens
  } else {
    global.ENS[account] = ''
  }

  return ens ? ens : ''
}

export async function ResolveEns(ens: string | undefined): Promise<string> {
  if (ens == undefined || ens == '') {
    return ''
  }
  const mainnet = new RpcClient(alchemyProviderMainnet)
  console.log(mainnet.provider)

  console.debug(`Getting account for ${ens}`)

  const account = await mainnet.provider.resolveName(ens.toLowerCase())

  if (account) {
    console.log(`Address found for ENS ${ens}: ${account}`)
    return account
  }

  return ''
}
