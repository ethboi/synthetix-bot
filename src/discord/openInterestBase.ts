import { Client, ActivityType } from 'discord.js'
import formatNumber, { displayNumber } from '../utils/formatNumber'
import { GetOpenInterestBase } from '../actions/openInterestBase'

export async function SetUpDiscordBaseOI(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Base OI bot is online!`)

    const [openInterestPrev, openInterest] = await Promise.all([GetOpenInterestBase(true), GetOpenInterestBase(false)])

    if (openInterest) {
      await setNameActivityBaseOI(discordClient, openInterestPrev, openInterest)
    }
  })

  await discordClient.login(accessToken)
  return discordClient
}

export async function setNameActivityBaseOI(client: Client, openInterestPrev: number, openInterest: number) {
  try {
    const username = `$${displayNumber(openInterest)} OI`
    const change = ((openInterest - openInterestPrev) / openInterestPrev) * 100
    const changeDirection = openInterest > openInterestPrev
    const activity = `24h: ${formatNumber(change, { dps: 2, showSign: true })}% (${changeDirection ? '↗' : '↘'})`

    console.log('BASE OI')
    console.log(username)
    console.log(activity)

    client.guilds.cache.map(
      async (guild) => await guild.members.cache.find((m) => m.id === client.user?.id)?.setNickname(username),
    )
    client.user?.setActivity(activity, {
      type: ActivityType.Watching,
    })
  } catch (e: any) {
    console.log(e)
  }
}
