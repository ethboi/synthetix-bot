import { Client, ActivityType } from 'discord.js'
import formatNumber, { displayNumber } from '../utils/formatNumber'
import { GetPrices } from '../actions/price'
import { Pair } from '../types/dexscreener'
import { BTC_OP, ETH_OP, KWENTA_OP, SNX_OP, THALES_OP, TLX_OP, PYTH_OP, LERN_OP, ZORK_OP, CYDX_OP } from '../constants/addresses'

export async function SetUpDiscordPrices(discordClient: Client, accessToken: string, market: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord PRICE ${market} bot is online!`)
    const pairs = await GetPrices()
    let dps = 2

    let address = ''

    if (market == 'eth') {
      address = ETH_OP.toLowerCase()
    }
    if (market == 'btc') {
      address = BTC_OP.toLowerCase()
    }
    if (market == 'thales') {
      address = THALES_OP.toLowerCase()
    }
    if (market == 'snx') {
      address = SNX_OP.toLowerCase()
    }
    if (market == 'kwenta') {
      address = KWENTA_OP.toLowerCase()
    }
    if (market == 'tlx') {
      address = TLX_OP.toLowerCase()
    }
    if (market == 'pyth') {
      address = PYTH_OP.toLowerCase()
    }
    if (market == 'zork') {
      address = ZORK_OP.toLowerCase()
    }
    if (market == '2192') {
      address = LERN_OP.toLowerCase()
      dps = 4
    }
    if (market == 'cydx') {
      address = CYDX_OP.toLowerCase()
      dps = 4
    }
    if (market == 'ethbtc') {
      const ethPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == ETH_OP.toLowerCase())
      const btcPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == BTC_OP.toLowerCase())

      if (btcPair && ethPair) {
        await setNameActivityRatio(discordClient, ethPair, btcPair)
      }
      return
    }

    if (address) {
      const marketPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == address)
      if (marketPair) {
        await setNameActivityPrice(discordClient, marketPair, market, dps)
      } else {
        console.error(`Market pair not found for address: ${address}`)
      }
    } else {
      console.error(`Invalid market specified: ${market}`)
    }
  })

  await discordClient.login(accessToken)
  return discordClient
}

export async function setNameActivityPrice(client: Client, pair: Pair, market: string, dps = 2) {
  try {
    let price = formatNumber(Number(pair.priceUsd), { dps: dps })

    if (market == 'zork') {
      price = displayNumber(Number(pair.priceUsd))
    }

    const username = `${market.toUpperCase()} $${price} (${Number(pair.priceChange.h24) >= 0 ? '↗' : '↘'})`
    const activity = `24h: ${formatNumber(Number(pair.priceChange.h24), { dps: 2, showSign: true })}%`

    client.guilds.cache.map(
      async (guild) => await guild.members.cache.find((m) => m.id == client.user?.id)?.setNickname(username),
    )
    client.user?.setActivity(activity, {
      type: ActivityType.Watching,
    })
  } catch (e: any) {
    console.log(e)
  }
}

export async function setNameActivityRatio(client: Client, ethPair: Pair, btcPair: Pair) {
  try {
    const ratio = Number(ethPair.priceUsd) / Number(btcPair.priceUsd)

    const username = `${formatNumber(Number(ratio), { dps: 4 })} ETH/BTC`
    const activity = `Ether / Bitcoin Ratio`

    console.log(`ETH/BTC Ratio`)
    console.log(username)
    console.log(activity)

    client.guilds.cache.map(
      async (guild) => await guild.members.cache.find((m) => m.id == client.user?.id)?.setNickname(username),
    )
    client.user?.setActivity(activity, {
      type: ActivityType.Watching,
    })
  } catch (e: any) {
    console.log(e)
  }
}
