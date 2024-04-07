import { Client, ActivityType } from 'discord.js'
import formatNumber, { displayNumber } from '../utils/formatNumber'
import { calculateDayPercentage, calculatePercentageChange } from '../utils/utils'
import { getDailyStatsBase } from '../actions/volumeBase'
import { baseDailyStat } from '../types/synthetix'

export async function SetUpDiscordVolumeBase(discordClient: Client, accessToken: string, frontEnd: string) {
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
    // const adjustedPrevVol = applyDayPercentageToFee(prev.volume)
    // const changeDirection = today.volume > adjustedPrevVol
    // const change = calculatePercentageChange(adjustedPrevVol, today.volume)

    const username = `$${displayNumber(today.volume)} VOL. BASE`
    const activity = `Prev: $${displayNumber(prev.volume)}`

    console.log('VOL. BASE')
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
