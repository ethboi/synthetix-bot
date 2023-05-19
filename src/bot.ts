import { SetUpDiscord } from './discord'
import { DiscordClient } from './clients/discordClient'
import { Client } from 'discord.js'
import {
  DISCORD_ACCESS_TOKEN,
  DISCORD_ACCESS_TOKEN_BTC,
  DISCORD_ACCESS_TOKEN_ETH,
  DISCORD_ACCESS_TOKEN_FEES,
  DISCORD_ACCESS_TOKEN_OI,
  DISCORD_ACCESS_TOKEN_VOLUME,
  FRONTEND,
} from './config'
import { GetMarketDetails } from './actions'
import { FiveMinuteJob, OneMinuteJob } from './schedule'
import { SetUpDiscordVolume } from './discord/volume'
import { SetUpDiscordFees } from './discord/fees'
import { SetUpDiscordOpenInterest } from './discord/openInterest'
import { GetInflation } from './actions/inflation'
import { SetUpDiscordPrices } from './discord/prices'

let discordClient: Client
let discordVolume: Client
let discordFees: Client
let discordOI: Client
let discordEth: Client
let discordBtc: Client

export async function Run(): Promise<void> {
  try {
    console.log('Running Bot')
    global.MARKET_SETTINGS = {}
    await GetMarketDetails()
    await Promise.all([
      SetUpDiscord((discordClient = DiscordClient()), DISCORD_ACCESS_TOKEN, FRONTEND),
      SetUpDiscordVolume((discordVolume = DiscordClient()), DISCORD_ACCESS_TOKEN_VOLUME, FRONTEND),
      SetUpDiscordFees((discordFees = DiscordClient()), DISCORD_ACCESS_TOKEN_FEES, FRONTEND),
      SetUpDiscordOpenInterest((discordOI = DiscordClient()), DISCORD_ACCESS_TOKEN_OI, FRONTEND),
      SetUpDiscordPrices((discordEth = DiscordClient()), DISCORD_ACCESS_TOKEN_ETH, 'eth'),
      SetUpDiscordPrices((discordBtc = DiscordClient()), DISCORD_ACCESS_TOKEN_BTC, 'btc'),
    ])

    //await GetInflation()

    FiveMinuteJob(discordVolume, discordFees, discordOI)
    OneMinuteJob(discordEth, discordBtc)
  } catch (error) {
    console.log(error)
  }
}
