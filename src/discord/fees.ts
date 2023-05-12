import { Client, ActivityType } from 'discord.js'
import { displayNumber } from '../utils/formatNumber'
import { getFees } from '../actions/fees'

export async function SetUpDiscordFees(discordClient: Client, accessToken: string, frontEnd: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Volume bot is online!`)
  })

  const [dailyFees, weeklyFees] = await Promise.all([getFees(true), getFees(false)])

  await discordClient.login(accessToken)

  if (dailyFees && weeklyFees) {
    await setNameActivityFees(discordClient, dailyFees.fees, weeklyFees.fees)
  }
  return discordClient
}

export async function setNameActivityFees(client: Client, dailyFees: number, weeklyFees: number) {
  try {
    await client.user?.setUsername(`$${displayNumber(weeklyFees)} | WK`)
    client.user?.setActivity(`24h: ${displayNumber(dailyFees)} | FEES`, {
      type: ActivityType.Watching,
    })
  } catch (e: any) {
    console.log(e)
  }
}
