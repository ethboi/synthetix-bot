import { Client, ActivityType } from 'discord.js'
import { displayNumber } from '../utils/formatNumber'
import { FetchTotalBurnedSNX, GetBuybackData } from '../actions/buyback'
import { Buyback } from '../types/buyback'

export async function SetUpDiscordBuyback(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async () => {
    console.debug(`Discord Buyback/Burn bot is online!`)
    const buyback = await GetBuybackData()
    await setNameActivityBuyback(discordClient, buyback)
  })
  await discordClient.login(accessToken)
  return discordClient
}

export async function setNameActivityBuyback(client: Client, buyback: Buyback) {
  try {
    const weeklyBurnedSNX = await calculateWeeklyBurnedSNX()
    const totalBurnedSNX = await calculateTotalBurnedSNX()
    const username = `${displayNumber(weeklyBurnedSNX)} / ${displayNumber(totalBurnedSNX)} SNX`
    const now = new Date()
    const previousWednesday = getPreviousWednesday(now)
    // If you want to show the timeframe uncomment below:
    //const startDateString = previousWednesday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    //const endDateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    // const activity = `Weekly Wednessay Burn: ${startDateString} - ${endDateString}`;
    const activity = `Weekly / Total Burn`

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

async function calculateWeeklyBurnedSNX(): Promise<number> {
  const buyback = await GetBuybackData()
  return buyback.weeklyBurnedSNX
}

async function calculateTotalBurnedSNX(): Promise<number> {
  const totalBurnedSNX = await FetchTotalBurnedSNX()
  if (totalBurnedSNX === undefined) {
    throw new Error('Failed to fetch total burned SNX')
  }
  return totalBurnedSNX
}

function getPreviousWednesday(now: Date): Date {
  const dayOfWeek = now.getDay()
  const daysSincePreviousWednesday = (dayOfWeek + 7 - 3) % 7
  const previousWednesday = new Date(now)
  previousWednesday.setDate(now.getDate() - daysSincePreviousWednesday)
  previousWednesday.setHours(0, 0, 0, 0) // Set hours to midnight
  return previousWednesday
}
