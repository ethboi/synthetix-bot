import { Client, ActivityType } from 'discord.js'
import formatNumber, { displayNumber } from '../utils/formatNumber'
import { calculatePercentageChange } from '../utils/utils'
import { getVolume } from '../actions/volume'

export async function SetUpDiscordVolume(discordClient: Client, accessToken: string, frontEnd: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Volume bot is online!`)
  })

  const [prevStats, stats] = await Promise.all([getVolume(true), getVolume(false)])

  await discordClient.login(accessToken)

  if (prevStats && stats) {
    await setNameActivity(discordClient, prevStats.total, prevStats.trades, stats?.total, stats.trades)
  }
  return discordClient
}

export async function setNameActivity(
  client: Client,
  prevVolume: number,
  prevTrades: number,
  volume: number,
  trades: number,
) {
  try {
    const changeDirection = volume > prevVolume
    const change = calculatePercentageChange(prevVolume, volume)
    //let initialPresence = 'VOL'

    // setInterval(async () => {
    //   initialPresence = updatePresence(client, change, trades, initialPresence)
    // }, 10000)

    await client.user?.setUsername(`$${displayNumber(volume)} (${changeDirection ? '↗' : '↘'})`).then(() => {
      client.user?.setActivity(`24h: ${formatNumber(change, { dps: 2, showSign: true })}% | VOL`, {
        type: ActivityType.Watching,
      })
    })
  } catch (e: any) {
    console.log(e)
  }
}

const updatePresence = (client: Client, volChange: number, trades: number, initialPresence: string): string => {
  if (initialPresence == 'VOL') {
    client.user?.setActivity(`24h: ${formatNumber(volChange, { dps: 2, showSign: true })}% | VOL`, {
      type: ActivityType.Watching,
    })
    return 'TRADES'
  }

  client.user?.setActivity(`24h: ${displayNumber(trades)} | TRADES`, {
    type: ActivityType.Watching,
  })
  return 'VOL'
}
