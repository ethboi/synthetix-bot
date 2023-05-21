import { Client, ActivityType } from 'discord.js'
import formatNumber from '../utils/formatNumber'
import { getDailyStats } from '../actions/dailyStats'
import { sDailyStat } from '../types/synthetix'

export async function SetUpDiscordTrades(discordClient: Client, accessToken: string, frontEnd: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord TRADERS is online!`)
    const dailyStats = await getDailyStats()
    if (dailyStats) {
      await setNameActivityTrades(discordClient, dailyStats)
    }
  })
  await discordClient.login(accessToken)
  return discordClient
}

export async function setNameActivityTrades(client: Client, dailyStats: sDailyStat[]) {
  try {
    const today = dailyStats[0]

    const username = `${formatNumber(today.trades)} TRADES 24h`
    const activity = `All: ${formatNumber(today.cumulativeTrades)}`

    console.log('TRADES')
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
