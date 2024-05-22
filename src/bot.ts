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
  DISCORD_ACCESS_TOKEN_VOLUME_BASE,
  DISCORD_ACCESS_TOKEN_VOLUME_COMBINED,
  DISCORD_ACCESS_TOKEN_BASE_FEES,
  DISCORD_ACCESS_TOKEN_BASE_OI,
  DISCORD_ACCESS_TOKEN_PYTH,
  DISCORD_ACCESS_TOKEN_TLX,
  FRONTEND,
  TESTNET,
} from './config'
import { GetMarketDetails } from './actions'
import { SixMinuteJob, FiveMinuteJob, OneMinuteJob } from './schedule'
import { SetUpDiscordVolume } from './discord/volume'
import { SetUpDiscordVolumeBase } from './discord/volumeBase'
import { SetUpDiscordVolumeCombined } from './discord/volumeCombined'
import { SetUpDiscordFees } from './discord/fees'
import { SetUpDiscordOpenInterest } from './discord/openInterest'
import { SetUpDiscordBaseFees } from './discord/feesBase'
import { SetUpDiscordBaseOI } from './discord/openInterestBase'
import { SetUpDiscordPrices } from './discord/prices'
import { SetUpDiscordBuyback } from './discord/buyback'
import { SetUpDiscordTraders } from './discord/traders'
import { SetUpDiscordTrades } from './discord/trades'

let discordClient: Client
let discordVolume: Client
let discordVolumeBase: Client
let discordVolumeCombined: Client
let discordFees: Client
let discordBaseFees: Client
let discordOI: Client
let discordBaseOI: Client
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
let discordTlx: Client
let discordPyth: Client

export async function Run(): Promise<void> {
  try {
    console.log('Running Bot')
    global.MARKET_SETTINGS = {}
    global.ENS = {}
    // await GetMarketDetails()
    // await Promise.all([SetUpDiscord((discordClient = DiscordClient()), DISCORD_ACCESS_TOKEN, FRONTEND)])

    if (!TESTNET) {
      await Promise.all([
        // SetUpDiscordVolume((discordVolume = DiscordClient()), DISCORD_ACCESS_TOKEN_VOLUME, FRONTEND),
        // SetUpDiscordVolumeBase((discordVolumeBase = DiscordClient()), DISCORD_ACCESS_TOKEN_VOLUME_BASE, FRONTEND),
        // SetUpDiscordVolumeCombined(
        //   (discordVolumeCombined = DiscordClient()),
        //   DISCORD_ACCESS_TOKEN_VOLUME_COMBINED,
        //   FRONTEND,
        // ),
        SetUpDiscordFees((discordFees = DiscordClient()), DISCORD_ACCESS_TOKEN_FEES, FRONTEND),
        SetUpDiscordBaseFees((discordBaseFees = DiscordClient()), DISCORD_ACCESS_TOKEN_BASE_FEES, FRONTEND),
        SetUpDiscordOpenInterest((discordOI = DiscordClient()), DISCORD_ACCESS_TOKEN_OI, FRONTEND),
        SetUpDiscordBaseOI((discordBaseOI = DiscordClient()), DISCORD_ACCESS_TOKEN_BASE_OI, FRONTEND),
        // SetUpDiscordPrices((discordEth = DiscordClient()), DISCORD_ACCESS_TOKEN_ETH, 'eth'),
        // SetUpDiscordPrices((discordBtc = DiscordClient()), DISCORD_ACCESS_TOKEN_BTC, 'btc'),
        // SetUpDiscordBuyback((discordBuyback = DiscordClient()), DISCORD_ACCESS_TOKEN_BUYBACK, FRONTEND), //New Buyback Bot (Inflationbot offline)
        // SetUpDiscordTraders((discordTraders = DiscordClient()), DISCORD_ACCESS_TOKEN_TRADERS, FRONTEND),
        // SetUpDiscordTrades((discordTrades = DiscordClient()), DISCORD_ACCESS_TOKEN_TRADES, FRONTEND),
        // SetUpDiscordPrices((discordLyra = DiscordClient()), DISCORD_ACCESS_TOKEN_LYRA, 'lyra'),
        // SetUpDiscordPrices((discordThales = DiscordClient()), DISCORD_ACCESS_TOKEN_THALES, 'thales'),
        // SetUpDiscordPrices((discordSNX = DiscordClient()), DISCORD_ACCESS_TOKEN_SNX, 'snx'),
        // SetUpDiscordPrices((discordKwenta = DiscordClient()), DISCORD_ACCESS_TOKEN_KWENTA, 'kwenta'),
        // SetUpDiscordPrices((discordEthBtc = DiscordClient()), DISCORD_ACCESS_TOKEN_ETHBTC, 'ethbtc'),
        SetUpDiscordPrices((discordTlx = DiscordClient()), DISCORD_ACCESS_TOKEN_TLX, 'tlx'),
        SetUpDiscordPrices((discordPyth  = DiscordClient()), DISCORD_ACCESS_TOKEN_PYTH, 'pyth'),
      ])
      FiveMinuteJob(
        discordVolume,
        discordVolumeBase,
        discordVolumeCombined,
        discordFees,
        discordBaseFees,
        discordOI,
        discordBaseOI,
        discordTraders,
        discordTrades,
      )
      OneMinuteJob(discordEth, discordBtc, discordLyra, discordThales, discordSNX, discordKwenta, discordEthBtc, discordTlx, discordPyth)
      // SixMinuteJob(discordBuyback)
    }
  } catch (error) {
    console.log(error)
  }
}
