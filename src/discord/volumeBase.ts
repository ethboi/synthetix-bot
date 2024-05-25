import { Client, ActivityType } from 'discord.js'
import { displayNumber } from '../utils/formatNumber'
import { getDailyStatsBase } from '../actions/volumeBase'
import { baseDailyStat } from '../types/synthetix'

export async function SetUpDiscordVolumeBase(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Base Volume bot is online!`)
    const dailyStats = await getDailyStatsBase()
    if (dailyStats) {
      await setNameActivityVolumeBase(discordClient, dailyStats)
    }
  })
  await discordClient.login(accessToken)
  return discordClient
}

export async function setNameActivityVolumeBase(client: Client, dailyStats: baseDailyStat[]) {
  try {
    const today = dailyStats[0]
    const prev = dailyStats[1]
    const username = `$${displayNumber(today.volume)} VOL. BASE`
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
