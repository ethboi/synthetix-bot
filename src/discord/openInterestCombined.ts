import { Client, ActivityType } from 'discord.js'
import { displayNumber } from '../utils/formatNumber'
import { GetOpenInterestBase } from '../actions/openInterestBase'
import { GetOpenInterestArb } from '../actions/openInterestArb'
import { GetOpenInterest } from '../actions/openInterest'
import { sDailyStat } from '../types/synthetix'

export async function SetUpDiscordopenInterestCombined(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Combined Openinterest bot is online!`)

    // Fetch today's and yesterday's stats for each chain
    const dailyStatsBaseToday = await GetOpenInterestBase(false)
    const dailyStatsBaseYesterday = await GetOpenInterestBase(true)
    
    const dailyStatsOPToday = await GetOpenInterest(false)
    const dailyStatsOPYesterday = await GetOpenInterest(true)

    const dailyStatsArbToday = await GetOpenInterestArb(false)
    const dailyStatsArbYesterday = await GetOpenInterestArb(true)

    const dailyStatsCombined = combineStats(
      dailyStatsOPToday, dailyStatsOPYesterday, 
      dailyStatsBaseToday, dailyStatsBaseYesterday, 
      dailyStatsArbToday, dailyStatsArbYesterday
    )

    if (dailyStatsCombined) {
      await setNameActivityOpenInterestCombined(discordClient, dailyStatsCombined)
    }
  })

  await discordClient.login(accessToken)
  return discordClient
}

export function combineStats(
  dailyStatsOPToday: number, 
  dailyStatsOPYesterday: number,
  dailyStatsBaseToday: number, 
  dailyStatsBaseYesterday: number,
  dailyStatsArbToday: number, 
  dailyStatsArbYesterday: number
) {
  // Calculate the combined open interest for today and yesterday directly using numbers
  const combinedTodayOpenInterest = dailyStatsOPToday + dailyStatsBaseToday + dailyStatsArbToday
  const combinedYesterdayOpenInterest = dailyStatsOPYesterday + dailyStatsBaseYesterday + dailyStatsArbYesterday

  // Return combined stats as an array of objects to match the expected format
  const dailyStatsCombined = [
    { openinterest: combinedTodayOpenInterest },
    { openinterest: combinedYesterdayOpenInterest }
  ]
  
  return dailyStatsCombined
}

export async function setNameActivityOpenInterestCombined(client: Client, dailyStats: any) {
  try {
    const today = dailyStats[0]
    const prev = dailyStats[1]

    const username = `!$${displayNumber(today.openinterest)} OI COMB.`
    const activity = `Prev: $${displayNumber(prev.openinterest)}`

    console.log('OPENINTEREST COMBINED')
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
