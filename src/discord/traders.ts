import { Client, ActivityType } from 'discord.js'
import formatNumber, { displayNumber } from '../utils/formatNumber'
import { calculateDayPercentage, calculatePercentageChange } from '../utils/utils'
import { getDailyStats } from '../actions/dailyStats'
import { sDailyStat } from '../types/synthetix'

export async function SetUpDiscordTraders(discordClient: Client, accessToken: string, frontEnd: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord TRADERS is online!`)
    const dailyStats = await getDailyStats()
    if (dailyStats) {
      await setNameActivityTraders(discordClient, dailyStats)
    }
  })
  await discordClient.login(accessToken)
  return discordClient
}

export async function setNameActivityTraders(client: Client, dailyStats: sDailyStat[]) {
  try {
    const today = dailyStats[0]
    const prev = dailyStats[1]

    const todayTraders = today.newTraders + today.existingTraders
    const prevTraders = prev.newTraders + prev.existingTraders

    const changeDirection = todayTraders > prevTraders
    const change = calculatePercentageChange(prevTraders, todayTraders)

    const username = `${formatNumber(todayTraders)} TRADERS 24h`
    const activity = `All: ${formatNumber(today.cumulativeTraders)}`

    console.log('TRADERS')
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
