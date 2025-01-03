import { Client, ActivityType } from 'discord.js'
import { displayNumber } from '../utils/formatNumber'
import { getDailyStatsBase } from '../actions/volumeBase' 
import { getDailyStatsArb } from '../actions/volumeArb' 
import { getDailyStats } from '../actions/dailyStats' 
import { sDailyStat } from '../types/synthetix'

export async function SetUpDiscordVolumeCombined(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Combined Volume bot is online!`)

    const dailyStatsBase = await getDailyStatsBase()
    const dailyStatsOP = await getDailyStats()
    const dailyStatsArb = await getDailyStatsArb()
    const dailyStatsCombined = combineStats(dailyStatsOP, dailyStatsBase, dailyStatsArb)

    if (dailyStatsCombined) {
      await setNameActivityVolumeCombined(discordClient, dailyStatsCombined)
    }
  })

  await discordClient.login(accessToken)
  return discordClient
}

export function combineStats(dailyStatsOP: sDailyStat[] | undefined, dailyStatsBase: { volume: number }[], dailyStatsArb: { volume: number }[]) {
  // Check if dailyStatsOP and dailyStatsBase are defined
  if (!dailyStatsOP || !dailyStatsBase || !dailyStatsArb) {
    console.error('Failed to fetch daily stats from OP or Base')
    return // Exit if either is undefined
  }
  // Calculate the combined volumes for today and yesterday
  console.log(dailyStatsBase[0].volume)
  const combinedTodayVolume = dailyStatsOP[0].volume + dailyStatsBase[0].volume + dailyStatsArb[0].volume
  const combinedYesterdayVolume = dailyStatsOP[1].volume + dailyStatsBase[1].volume + dailyStatsArb[1].volume

  // Use combined volumes for setting the name and activity
  const dailyStatsCombined = [{ volume: combinedTodayVolume }, { volume: combinedYesterdayVolume }]
  return dailyStatsCombined
}

export async function setNameActivityVolumeCombined(client: Client, dailyStats: any) {
  try {
    const today = dailyStats[0]
    const prev = dailyStats[1]

    const username = `!$${displayNumber(today.volume)} VOL. COMB.`
    const activity = `Prev: $${displayNumber(prev.volume)}`

    console.log('VOLUME COMBINED')
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
