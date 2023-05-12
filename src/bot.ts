import { SetUpDiscord } from './discord'
import { DiscordClient } from './clients/discordClient'
import { Client } from 'discord.js'
import { DISCORD_ACCESS_TOKEN, DISCORD_ACCESS_TOKEN_FEES, DISCORD_ACCESS_TOKEN_VOLUME, FRONTEND } from './config'
import { GetMarketDetails } from './actions'
import { FeesJob, VolumeJob } from './schedule'
import { SetUpDiscordVolume } from './discord/volume'
import { SetUpDiscordFees } from './discord/fees'

let discordClient: Client
let discordVolume: Client
let discordFees: Client

export async function Run(): Promise<void> {
  try {
    console.log('Running Bot')
    global.MARKET_SETTINGS = {}
    await GetMarketDetails()
    await Promise.all([
      SetUpDiscord((discordClient = DiscordClient()), DISCORD_ACCESS_TOKEN, FRONTEND),
      SetUpDiscordVolume((discordVolume = DiscordClient()), DISCORD_ACCESS_TOKEN_VOLUME, FRONTEND),
      SetUpDiscordFees((discordFees = DiscordClient()), DISCORD_ACCESS_TOKEN_FEES, FRONTEND),
    ])

    VolumeJob(discordVolume)
    FeesJob(discordFees)
  } catch (error) {
    console.log(error)
  }
}
