import { Client, ActivityType } from 'discord.js'
import formatNumber, { displayNumber } from '../utils/formatNumber'
import { calculateDayPercentage, calculatePercentageChange } from '../utils/utils'
import { getDailyStats } from '../actions/dailyStats'

export async function SetUpDiscordVolume(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Volume bot is online!`)
    const dailyStats = await getDailyStats()
    if (dailyStats) {
      await setNameActivityVolume(discordClient, dailyStats)
    }
  })
  await discordClient.login(accessToken)
  return discordClient
}

export async function setNameActivityVolume(client: Client, dailyStats: any[]) {
  try {
    const today = dailyStats[0]
    const prev = dailyStats[1]
    const adjustedPrevVol = applyDayPercentageToFee(prev.volume)
    const changeDirection = today.volume > adjustedPrevVol
    const change = calculatePercentageChange(adjustedPrevVol, today.volume)

    const username = `$${displayNumber(today.volume)} VOL. OP`
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

function applyDayPercentageToFee(fee: number): number {
  const percentage = calculateDayPercentage()
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
