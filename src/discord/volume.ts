import { Client, ActivityType } from 'discord.js'
import formatNumber, { displayNumber } from '../utils/formatNumber'
import { calculateDayPercentage, calculatePercentageChange } from '../utils/utils'
import { getDailyStats } from '../actions/dailyStats'
import { sDailyStat } from '../types/synthetix'

export async function SetUpDiscordVolume(discordClient: Client, accessToken: string, frontEnd: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Volume bot is online!`)
  })

  const dailyStats = await getDailyStats()
  await discordClient.login(accessToken)

  if (dailyStats) {
    await setNameActivityVolume(discordClient, dailyStats)
  }

  return discordClient
}

export async function setNameActivityVolume(client: Client, dailyStats: sDailyStat[]) {
  try {
    const today = dailyStats[0]
    const prev = dailyStats[1]
    const adjustedPrevVol = applyDayPercentageToFee(prev.volume)
    const changeDirection = today.volume > adjustedPrevVol
    const change = calculatePercentageChange(adjustedPrevVol, today.volume)
    const username = `$${displayNumber(today.volume)} (${changeDirection ? '↗' : '↘'})`
    const activity = `24h: ${formatNumber(change, { dps: 2, showSign: true })}% | VOL`
    console.log('VOLUME')
    console.log(username)
    console.log(activity)

    await client.user?.setUsername(username)

    client.user?.setActivity(activity, {
      type: ActivityType.Watching,
    })
  } catch (e: any) {
    console.log(e)
  }
}

function applyDayPercentageToFee(fee: number): number {
  const percentage = calculateDayPercentage()
  //console.log(percentage)
  return fee * (percentage / 100)
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
