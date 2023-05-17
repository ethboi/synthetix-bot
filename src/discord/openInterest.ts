import { Client, ActivityType } from 'discord.js'
import formatNumber, { displayNumber } from '../utils/formatNumber'
import { GetOpenInterest } from '../actions/openInterest'
import { calculatePercentageChange } from '../utils/utils'

export async function SetUpDiscordOpenInterest(discordClient: Client, accessToken: string, frontEnd: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Open Interest bot is online!`)
  })

  const [openInterestPrev, openInterest] = await Promise.all([GetOpenInterest(true), GetOpenInterest(false)])
  await discordClient.login(accessToken)

  await setNameActivityOI(discordClient, openInterestPrev, openInterest)
  return discordClient
}

export async function setNameActivityOI(client: Client, openInterestPrev: number, openInterest: number) {
  try {
    const changeDirection = openInterest > openInterestPrev
    const change = calculatePercentageChange(openInterestPrev, openInterest)
    const username = `$${displayNumber(openInterest)} (${changeDirection ? '↗' : '↘'})`
    const activity = `24h: ${formatNumber(change, { dps: 2, showSign: true })}% | OI`

    console.log('OPEN INTEREST')
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
