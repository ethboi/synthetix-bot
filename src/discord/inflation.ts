import { Client, ActivityType, time } from 'discord.js'
import { displayNumber } from '../utils/formatNumber'
import { GetInflation } from '../actions/inflation'
import { Inflation } from '../types/inflation'

export async function SetUpDiscordInflation(discordClient: Client, accessToken: string, frontEnd: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Inflation bot is online!`)
    const inflation = await GetInflation()
    await setNameActivityInflation(discordClient, inflation)
  })
  await discordClient.login(accessToken)
  return discordClient
}

export async function setNameActivityInflation(client: Client, inflation: Inflation) {
  try {
    const username = `${displayNumber(inflation.supplyMinted)} SNX`
    const date = new Date(inflation.lastMintEvent * 1000)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthIndex = date.getUTCMonth()
    // Get short month name using the month index
    const monthName = monthNames[monthIndex]
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()

    // Ensure day and month are two digits
    const dayStr = day < 10 ? '0' + day : '' + day

    const shortDateStr = dayStr + ' ' + monthName.toUpperCase() + ' ' + year
    const activity = `Mint: ${shortDateStr} `

    console.log('INFLATION')
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
