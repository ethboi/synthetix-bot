import { SetUpDiscord } from './discord'
import { DiscordClient } from './clients/discordClient'
import { Client } from 'discord.js'
import {
  DISCORD_ACCESS_TOKEN,
  DISCORD_ACCESS_TOKEN_FEES,
  DISCORD_ACCESS_TOKEN_OI,
  DISCORD_ACCESS_TOKEN_VOLUME,
  FRONTEND,
} from './config'
import { GetMarketDetails } from './actions'
import { StatsJobs } from './schedule'
import { SetUpDiscordVolume } from './discord/volume'
import { SetUpDiscordFees } from './discord/fees'
import { SetUpDiscordOpenInterest } from './discord/openInterest'

let discordClient: Client
let discordVolume: Client
let discordFees: Client
let discordOI: Client

export async function Run(): Promise<void> {
  try {
    console.log('Running Bot')
    global.MARKET_SETTINGS = {}
    await GetMarketDetails()
    await Promise.all([
      SetUpDiscord((discordClient = DiscordClient()), DISCORD_ACCESS_TOKEN, FRONTEND),
      SetUpDiscordVolume((discordVolume = DiscordClient()), DISCORD_ACCESS_TOKEN_VOLUME, FRONTEND),
      SetUpDiscordFees((discordFees = DiscordClient()), DISCORD_ACCESS_TOKEN, FRONTEND),
      SetUpDiscordOpenInterest((discordOI = DiscordClient()), DISCORD_ACCESS_TOKEN_OI, FRONTEND),
    ])

    StatsJobs(discordVolume, discordFees, discordOI)
  } catch (error) {
    console.log(error)
  }
}
