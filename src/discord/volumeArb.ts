import { Client, ActivityType } from 'discord.js'
import { displayNumber } from '../utils/formatNumber'
import { getDailyStatsArb } from '../actions/volumeArb'
import { arbDailyStat } from '../types/synthetix'

export async function SetUpDiscordVolumeArb(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Arbitrum Volume bot is online!`)
    const dailyStats = await getDailyStatsArb()
    if (dailyStats) {
      await setNameActivityVolumeArb(discordClient, dailyStats)
    }
  })
  await discordClient.login(accessToken)
  return discordClient
}

export async function setNameActivityVolumeArb(client: Client, dailyStats: arbDailyStat[]) {
  try {
    const today = dailyStats[0]
    const prev = dailyStats[1]
    const username = `$${displayNumber(today.volume)} VOL. ARBITRUM`
    const activity = `Prev: $${displayNumber(prev.volume)}`

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
