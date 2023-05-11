import { SetUpDiscord } from './discord'
import { DiscordClient } from './clients/discordClient'
import { Client } from 'discord.js'
import { DISCORD_ACCESS_TOKEN, DISCORD_ACCESS_TOKEN_VOLUME, FRONTEND, TESTNET } from './config'
import { GetMarketDetails } from './actions'
import { getVolume } from './actions/volume'
import { VolumeJob } from './schedule'
import { SetUpDiscordVolume } from './discord/volume'

let discordClient: Client
let discordVolume: Client

export async function Run(): Promise<void> {
  try {
    console.log('Running Bot')
    global.MARKET_SETTINGS = {}
    await GetMarketDetails()
    await Promise.all([
      SetUpDiscord((discordClient = DiscordClient()), DISCORD_ACCESS_TOKEN, FRONTEND),
      SetUpDiscordVolume((discordVolume = DiscordClient()), DISCORD_ACCESS_TOKEN_VOLUME, FRONTEND),
    ])

    VolumeJob(discordVolume)
  } catch (error) {
    console.log(error)
  }
}
