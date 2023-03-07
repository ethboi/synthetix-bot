import { SetUpDiscord } from './discord'
import { DiscordClient } from './clients/discordClient'
import { GetFundingRates } from './kwenta'
import { Client } from 'discord.js'
import { DISCORD_ACCESS_TOKEN } from './config'

let discordClient: Client

export async function Run(): Promise<void> {
  try {
    console.log('Running Bot')
    // set up discord
    await Promise.all([SetUpDiscord((discordClient = DiscordClient()), DISCORD_ACCESS_TOKEN)])

    await GetFundingRates()
  } catch (error) {
    console.log(error)
  }
}
