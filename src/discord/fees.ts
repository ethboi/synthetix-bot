import { Client, ActivityType } from 'discord.js'
import { displayNumber } from '../utils/formatNumber'
import { getDailyStats } from '../actions/dailyStats'
import { sDailyStat } from '../types/synthetix'

export async function SetUpDiscordFees(discordClient: Client, accessToken: string, frontEnd: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Volume bot is online!`)
  })
  await discordClient.login(accessToken)

  const dailyStats = await getDailyStats()

  if (dailyStats) {
    await setNameActivityFees(discordClient, dailyStats)
  }
  return discordClient
}

export async function setNameActivityFees(client: Client, dailyStats: sDailyStat[]) {
  try {
    // get the date
    const currentDate = new Date(dailyStats[0].day)
    const daysToIncl = daysSinceLastWednesday(currentDate)
    //console.log(daysToIncl)
    const epochDays = dailyStats.slice(0, daysToIncl)
    const epochFees = epochDays.reduce((accumulator, dailyStat) => {
      return accumulator + dailyStat.fees
    }, 0)

    await client.user?.setUsername(`$${displayNumber(epochFees)} | EP`)
    client.user?.setActivity(`24h: ${displayNumber(dailyStats[0].fees)} | FEES`, {
      type: ActivityType.Watching,
    })
  } catch (e: any) {
    console.log(e)
  }
}

function daysSinceLastWednesday(today: Date): number {
  const dayOfWeek = today.getDay() // 0 = Sunday, 3 = Wed, 6 = Sat
  const diff = dayOfWeek < 3 ? dayOfWeek + 4 : dayOfWeek === 3 ? 7 : dayOfWeek - 3
  return diff
}
