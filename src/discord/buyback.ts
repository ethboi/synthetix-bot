import { Client, ActivityType } from 'discord.js'
import { displayNumber } from '../utils/formatNumber'
import { GetBuybackData } from '../actions/buyback'

export async function SetUpDiscordBuyback(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async () => {
    await setNameActivityBuyback(discordClient)
  })
  await discordClient.login(accessToken)
  return discordClient
}

export async function setNameActivityBuyback(client: Client) {
  try {
    const buyback = await GetBuybackData()

    if (buyback) {
      const username = `${displayNumber(buyback.weeklyBurnedSNX)} / ${displayNumber(buyback.totalBurnedSNX)} SNX`
      //const now = new Date()
      // const previousWednesday = getPreviousWednesday(now)
      // const startDateString = previousWednesday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      // const endDateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      // If you want to show the timeframe uncomment below:
      // const activity = `Weekly Wednessay Burn: ${startDateString} - ${endDateString}`;
      const activity = `Weekly / Total Burn`

      client.guilds.cache.map(
        async (guild) => await guild.members.cache.find((m) => m.id == client.user?.id)?.setNickname(username),
      )
      client.user?.setActivity(activity, {
        type: ActivityType.Watching,
      })
    }
  } catch (e: any) {
    console.log(e)
  }
}

function getPreviousWednesday(now: Date): Date {
  const dayOfWeek = now.getDay()
  const daysSincePreviousWednesday = (dayOfWeek + 7 - 3) % 7
  const previousWednesday = new Date(now)
  previousWednesday.setDate(now.getDate() - daysSincePreviousWednesday)
  previousWednesday.setHours(0, 0, 0, 0) // Set hours to midnight
  return previousWednesday
}
