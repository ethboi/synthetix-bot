import { Client, ActivityType } from 'discord.js'
import formatNumber, { displayNumber } from '../utils/formatNumber'
import { GetOpenInterest } from '../actions/openInterest'
import { calculatePercentageChange } from '../utils/utils'

export async function SetUpDiscordOpenInterest(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async () => {
    console.debug(`Discord Open Interest bot is online!`)
    try {
      const [openInterestPrev, openInterest] = await Promise.all([GetOpenInterest(true), GetOpenInterest(false)])
      // console.debug(`Previous Open Interest: ${openInterestPrev}, Current Open Interest: ${openInterest}`)
      await setNameActivityOI(discordClient, openInterestPrev, openInterest)
    } catch (error) {
      console.error('Error fetching Open Interest')
    }
  })

  try {
    await discordClient.login(accessToken)
    console.debug('Logged into Discord successfully')
  } catch (error) {
    console.error('Error logging into Discord')
  }
  return discordClient
}

export async function setNameActivityOI(client: Client, openInterestPrev: number, openInterest: number) {
  try {
    const changeDirection = openInterest > openInterestPrev
    const change = calculatePercentageChange(openInterestPrev, openInterest)
    const username = `$${displayNumber(openInterest)} OI`
    const activity = `24h: ${formatNumber(change, { dps: 2, showSign: true })}% (${changeDirection ? '↗' : '↘'})`

    console.log('OPTIMISM OI')
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
