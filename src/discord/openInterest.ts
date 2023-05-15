import { Client, ActivityType } from 'discord.js'
import { displayNumber } from '../utils/formatNumber'
import { GetOpenInterest } from '../actions/openInterest'
import { calculatePercentageChange } from '../utils/utils'

export async function SetUpDiscordOpenInterest(discordClient: Client, accessToken: string, frontEnd: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Open Interest bot is online!`)
  })

  const [openInterestPrev, openInterest] = await Promise.all([GetOpenInterest(true), GetOpenInterest(false)])
  await discordClient.login(accessToken)

  await setNameActivityFees(discordClient, openInterestPrev, openInterest)
  return discordClient
}

export async function setNameActivityFees(client: Client, openInterestPrev: number, openInterest: number) {
  try {
    const changeDirection = openInterest > openInterestPrev
    const change = calculatePercentageChange(openInterestPrev, openInterest)

    await client.user?.setUsername(`$${displayNumber(openInterest)} (${changeDirection ? '↗' : '↘'})`).then(() => {
      client.user?.setActivity(`24h: ${displayNumber(change)}% | OI`, {
        type: ActivityType.Watching,
      })
    })
  } catch (e: any) {
    console.log('error?')
    console.log(e)
  }
}
