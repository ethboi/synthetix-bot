import { Client, ActivityType } from 'discord.js'
import formatNumber from '../utils/formatNumber'
import { GetPrices } from '../actions/price'
import { Pair } from '../types/dexscreener'
import { BTC_OP, ETH_OP } from '../constants/addresses'

export async function SetUpDiscordPrices(discordClient: Client, accessToken: string, market: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord PRICE ${market} bot is online!`)
  })

  const pairs = await GetPrices()
  let address = ''

  if (market == 'eth') {
    address = ETH_OP.toLowerCase()
  }
  if (market == 'btc') {
    address = BTC_OP.toLowerCase()
  }

  await discordClient.login(accessToken)

  if (address) {
    const marketPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == address)
    if (marketPair) {
      await setNameActivityPrice(discordClient, marketPair, market)
    }
  }

  return discordClient
}

export async function setNameActivityPrice(client: Client, pair: Pair, market: string) {
  try {
    const username = `${market.toUpperCase()} $${formatNumber(Number(pair.priceUsd), { dps: 2 })} (${
      Number(pair.priceChange.h24) >= 0 ? '↗' : '↘'
    })`
    const activity = `24h: ${formatNumber(Number(pair.priceChange.h24), { dps: 2, showSign: true })}% `
    console.log(`PRICE: ${market.toUpperCase()}`)
    console.log(username)
    console.log(activity)

    client.guilds.cache.map((guild) => guild.members.cache.find((m) => m.id == client.user?.id)?.setNickname(username))
    client.user?.setActivity(activity, {
      type: ActivityType.Watching,
    })
  } catch (e: any) {
    console.log(e)
  }
}
