import { Client, ActivityType } from 'discord.js'
import formatNumber, { displayNumber } from '../utils/formatNumber'
import { calculateDayPercentage, calculatePercentageChange } from '../utils/utils'
import { getVolume } from '../actions/volume'
import { sDailyStat } from '../types/synthetix'

export async function SetUpDiscordVolume(discordClient: Client, accessToken: string, frontEnd: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Volume bot is online!`)
  })

  const dailyStats = await getVolume()
  await discordClient.login(accessToken)

  if (dailyStats) {
    await setNameActivity(discordClient, dailyStats)
  }

  return discordClient
}

export async function setNameActivity(client: Client, dailyStats: sDailyStat[]) {
  try {
    const today = dailyStats[0]
    const prev = dailyStats[1]
    const adjustedPrevVol = applyDayPercentageToFee(prev.volume)
    const changeDirection = today.volume > adjustedPrevVol
    const change = calculatePercentageChange(adjustedPrevVol, today.volume)

    await client.user?.setUsername(`$${displayNumber(today.volume)} (${changeDirection ? '↗' : '↘'})`).then(() => {
      client.user?.setActivity(`24h: ${formatNumber(change, { dps: 2, showSign: true })}% | VOL`, {
        type: ActivityType.Watching,
      })
    })
  } catch (e: any) {
    console.log(e)
  }
}

function applyDayPercentageToFee(fee: number): number {
  const percentage = calculateDayPercentage()
  console.log(percentage)
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
