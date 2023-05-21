import { SetUpDiscord } from './discord'
import { DiscordClient } from './clients/discordClient'
import { Client } from 'discord.js'
import {
  DISCORD_ACCESS_TOKEN,
  DISCORD_ACCESS_TOKEN_BTC,
  DISCORD_ACCESS_TOKEN_ETH,
  DISCORD_ACCESS_TOKEN_FEES,
  DISCORD_ACCESS_TOKEN_INFLATION,
  DISCORD_ACCESS_TOKEN_OI,
  DISCORD_ACCESS_TOKEN_TRADERS,
  DISCORD_ACCESS_TOKEN_TRADES,
  DISCORD_ACCESS_TOKEN_VOLUME,
  FRONTEND,
} from './config'
import { GetMarketDetails } from './actions'
import { DailyJob, FiveMinuteJob, OneMinuteJob } from './schedule'
import { SetUpDiscordVolume } from './discord/volume'
import { SetUpDiscordFees } from './discord/fees'
import { SetUpDiscordOpenInterest } from './discord/openInterest'
import { SetUpDiscordPrices } from './discord/prices'
import { SetUpDiscordInflation } from './discord/inflation'
import { SetUpDiscordTraders } from './discord/traders'
import { SetUpDiscordTrades } from './discord/trades'

let discordClient: Client
let discordVolume: Client
let discordFees: Client
let discordOI: Client
let discordEth: Client
let discordBtc: Client
let discordInflation: Client
let discordTraders: Client
let discordTrades: Client

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
      SetUpDiscordInflation((discordInflation = DiscordClient()), DISCORD_ACCESS_TOKEN_INFLATION, FRONTEND),
      SetUpDiscordTraders((discordTraders = DiscordClient()), DISCORD_ACCESS_TOKEN_TRADERS, FRONTEND),
      SetUpDiscordTrades((discordTrades = DiscordClient()), DISCORD_ACCESS_TOKEN_TRADES, FRONTEND),
    ])

    FiveMinuteJob(discordVolume, discordFees, discordOI, discordTraders, discordTrades)
    OneMinuteJob(discordEth, discordBtc)
    DailyJob(discordInflation)
  } catch (error) {
    console.log(error)
  }
}
