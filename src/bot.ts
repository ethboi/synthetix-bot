import { SetUpDiscord } from './discord'
import { DiscordClient } from './clients/discordClient'
import { Client } from 'discord.js'
import {
  DISCORD_ACCESS_TOKEN,
  DISCORD_ACCESS_TOKEN_BTC,
  DISCORD_ACCESS_TOKEN_ETH,
  DISCORD_ACCESS_TOKEN_ETHBTC,
  DISCORD_ACCESS_TOKEN_FEES,
  DISCORD_ACCESS_TOKEN_BUYBACK,
  DISCORD_ACCESS_TOKEN_KWENTA,
  DISCORD_ACCESS_TOKEN_LYRA,
  DISCORD_ACCESS_TOKEN_OI,
  DISCORD_ACCESS_TOKEN_SNX,
  DISCORD_ACCESS_TOKEN_THALES,
  DISCORD_ACCESS_TOKEN_TRADERS,
  DISCORD_ACCESS_TOKEN_TRADES,
  DISCORD_ACCESS_TOKEN_VOLUME,
  FRONTEND,
  TESTNET,
} from './config'
import { GetMarketDetails } from './actions'
import { SixMinuteJob, FiveMinuteJob, OneMinuteJob } from './schedule'
import { SetUpDiscordVolume } from './discord/volume'
import { SetUpDiscordFees } from './discord/fees'
import { SetUpDiscordOpenInterest } from './discord/openInterest'
import { SetUpDiscordPrices } from './discord/prices'
import { SetUpDiscordBuyback } from './discord/buyback'
import { SetUpDiscordTraders } from './discord/traders'
import { SetUpDiscordTrades } from './discord/trades'

let discordClient: Client
let discordVolume: Client
let discordFees: Client
let discordOI: Client
let discordEth: Client
let discordBtc: Client
let discordBuyback: Client
let discordTraders: Client
let discordTrades: Client
let discordLyra: Client
let discordThales: Client
let discordSNX: Client
let discordKwenta: Client
let discordEthBtc: Client

export async function Run(): Promise<void> {
  try {
    console.log('Running Bot')
    global.MARKET_SETTINGS = {}
    global.ENS = {}
    await GetMarketDetails()
    await Promise.all([SetUpDiscord((discordClient = DiscordClient()), DISCORD_ACCESS_TOKEN, FRONTEND)])

    if (!TESTNET) {
      await Promise.all([
        SetUpDiscordVolume((discordVolume = DiscordClient()), DISCORD_ACCESS_TOKEN_VOLUME, FRONTEND),
        SetUpDiscordFees((discordFees = DiscordClient()), DISCORD_ACCESS_TOKEN_FEES, FRONTEND),
        SetUpDiscordOpenInterest((discordOI = DiscordClient()), DISCORD_ACCESS_TOKEN_OI, FRONTEND),
        SetUpDiscordPrices((discordEth = DiscordClient()), DISCORD_ACCESS_TOKEN_ETH, 'eth'),
        SetUpDiscordPrices((discordBtc = DiscordClient()), DISCORD_ACCESS_TOKEN_BTC, 'btc'),
        SetUpDiscordBuyback((discordBuyback = DiscordClient()), DISCORD_ACCESS_TOKEN_BUYBACK), //New Buyback Bot (Inflationbot offline)
        SetUpDiscordTraders((discordTraders = DiscordClient()), DISCORD_ACCESS_TOKEN_TRADERS, FRONTEND),
        SetUpDiscordTrades((discordTrades = DiscordClient()), DISCORD_ACCESS_TOKEN_TRADES, FRONTEND),
        SetUpDiscordPrices((discordLyra = DiscordClient()), DISCORD_ACCESS_TOKEN_LYRA, 'lyra'),
        SetUpDiscordPrices((discordThales = DiscordClient()), DISCORD_ACCESS_TOKEN_THALES, 'thales'),
        SetUpDiscordPrices((discordSNX = DiscordClient()), DISCORD_ACCESS_TOKEN_SNX, 'snx'),
        SetUpDiscordPrices((discordKwenta = DiscordClient()), DISCORD_ACCESS_TOKEN_KWENTA, 'kwenta'),
        SetUpDiscordPrices((discordEthBtc = DiscordClient()), DISCORD_ACCESS_TOKEN_ETHBTC, 'ethbtc'),
      ])
      FiveMinuteJob(discordVolume, discordFees, discordOI, discordTraders, discordTrades)
      OneMinuteJob(discordEth, discordBtc, discordLyra, discordThales, discordSNX, discordKwenta, discordEthBtc)
      SixMinuteJob(discordBuyback)
    }
  } catch (error) {
    console.log(error)
  }
}
