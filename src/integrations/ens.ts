import { providerMainnet } from '../utils/providers'

export async function GetEns(account: string | undefined): Promise<string> {
  if (account == undefined) {
    return ''
  }

  console.debug(`Getting ens for ${account}`)
  const found = global.ENS[account.toLowerCase()]

  if (found || found === '') {
    console.debug('found ' + found)
    return found
  }

  const ens = await providerMainnet.lookupAddress(account)

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

  const account = await providerMainnet.resolveName(ens.toLowerCase())

  if (account) {
    console.log(`Address found for ENS ${ens}: ${account}`)
    return account
  }

  return ''
}
