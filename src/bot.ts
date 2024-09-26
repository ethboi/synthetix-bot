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
  DISCORD_ACCESS_TOKEN_OI,
  DISCORD_ACCESS_TOKEN_SNX,
  DISCORD_ACCESS_TOKEN_THALES,
  DISCORD_ACCESS_TOKEN_VOLUME,
  DISCORD_ACCESS_TOKEN_VOLUME_BASE,
  DISCORD_ACCESS_TOKEN_VOLUME_COMBINED,
  DISCORD_ACCESS_TOKEN_BASE_FEES,
  DISCORD_ACCESS_TOKEN_BASE_OI,
  DISCORD_ACCESS_TOKEN_PYTH,
  DISCORD_ACCESS_TOKEN_TLX,
  FRONTEND,
  TESTNET,
  DISCORD_ACCESS_TOKEN_LERN,
  DISCORD_ACCESS_TOKEN_ZORK,
  DISCORD_ACCESS_TOKEN_CYDX,
  DISCORD_ACCESS_TOKEN_VOLUME_ARB,
  DISCORD_ACCESS_TOKEN_ARB_FEES,
  DISCORD_ACCESS_TOKEN_ARB_OI,
  DISCORD_ACCESS_TOKEN_OI_COMBINED,
} from './config'
import { GetMarketDetails } from './actions'
import { SixMinuteJob, FiveMinuteJob, OneMinuteJob } from './schedule'
import { SetUpDiscordVolume } from './discord/volume'
import { SetUpDiscordVolumeBase } from './discord/volumeBase'
import { SetUpDiscordVolumeArb } from './discord/volumeArb'
import { SetUpDiscordVolumeCombined } from './discord/volumeCombined'
import { SetUpDiscordopenInterestCombined } from './discord/openInterestCombined'
import { SetUpDiscordFees } from './discord/fees'
import { SetUpDiscordOpenInterest } from './discord/openInterest'
import { SetUpDiscordBaseFees } from './discord/feesBase'
import { SetUpDiscordBaseOI } from './discord/openInterestBase'
import { SetUpDiscordArbFees } from './discord/feesArb'
import { SetUpDiscordArbOI } from './discord/openInterestArb'
import { SetUpDiscordPrices } from './discord/prices'
import { SetUpDiscordBuyback } from './discord/buyback'

let discordClient: Client
let discordVolume: Client
let discordVolumeBase: Client
let discordVolumeArb: Client
let discordVolumeCombined: Client
let discordOpenInterestCombined: Client
let discordFees: Client
let discordBaseFees: Client
let discordArbFees: Client
let discordOI: Client
let discordBaseOI: Client
let discordArbOI: Client
let discordEth: Client
let discordBtc: Client
let discordBuyback: Client
let discordThales: Client
let discordSNX: Client
let discordKwenta: Client
let discordEthBtc: Client
let discordTlx: Client
let discordPyth: Client
let discordLern: Client
let discordZork: Client
let discordCYDX: Client

export async function Run(): Promise<void> {
  try {
    console.log('Running Bot')
    global.MARKET_SETTINGS = {}
    global.ENS = {}
    await GetMarketDetails()
    await Promise.all([SetUpDiscord((discordClient = DiscordClient()), DISCORD_ACCESS_TOKEN, FRONTEND)])

    if (!TESTNET) {
      await Promise.all([
        SetUpDiscordVolume((discordVolume = DiscordClient()), DISCORD_ACCESS_TOKEN_VOLUME),
        SetUpDiscordVolumeBase((discordVolumeBase = DiscordClient()), DISCORD_ACCESS_TOKEN_VOLUME_BASE),
        SetUpDiscordVolumeArb((discordVolumeArb = DiscordClient()), DISCORD_ACCESS_TOKEN_VOLUME_ARB),
        SetUpDiscordVolumeCombined((discordVolumeCombined = DiscordClient()), DISCORD_ACCESS_TOKEN_VOLUME_COMBINED),
        SetUpDiscordFees((discordFees = DiscordClient()), DISCORD_ACCESS_TOKEN_FEES),
        SetUpDiscordBaseFees((discordBaseFees = DiscordClient()), DISCORD_ACCESS_TOKEN_BASE_FEES),
        SetUpDiscordArbFees((discordArbFees = DiscordClient()), DISCORD_ACCESS_TOKEN_ARB_FEES),
        SetUpDiscordOpenInterest((discordOI = DiscordClient()), DISCORD_ACCESS_TOKEN_OI),
        SetUpDiscordBaseOI((discordBaseOI = DiscordClient()), DISCORD_ACCESS_TOKEN_BASE_OI),
        SetUpDiscordArbOI((discordArbOI = DiscordClient()), DISCORD_ACCESS_TOKEN_ARB_OI),
        SetUpDiscordopenInterestCombined(
          (discordOpenInterestCombined = DiscordClient()),
          DISCORD_ACCESS_TOKEN_OI_COMBINED,
        ),
        SetUpDiscordBuyback((discordBuyback = DiscordClient()), DISCORD_ACCESS_TOKEN_BUYBACK), //New Buyback Bot (Inflationbot offline)
        SetUpDiscordPrices((discordEth = DiscordClient()), DISCORD_ACCESS_TOKEN_ETH, 'eth'),
        SetUpDiscordPrices((discordBtc = DiscordClient()), DISCORD_ACCESS_TOKEN_BTC, 'btc'),
        SetUpDiscordPrices((discordThales = DiscordClient()), DISCORD_ACCESS_TOKEN_THALES, 'thales'),
        SetUpDiscordPrices((discordSNX = DiscordClient()), DISCORD_ACCESS_TOKEN_SNX, 'snx'),
        SetUpDiscordPrices((discordKwenta = DiscordClient()), DISCORD_ACCESS_TOKEN_KWENTA, 'kwenta'),
        SetUpDiscordPrices((discordEthBtc = DiscordClient()), DISCORD_ACCESS_TOKEN_ETHBTC, 'ethbtc'),
        SetUpDiscordPrices((discordTlx = DiscordClient()), DISCORD_ACCESS_TOKEN_TLX, 'tlx'),
        SetUpDiscordPrices((discordPyth = DiscordClient()), DISCORD_ACCESS_TOKEN_PYTH, 'pyth'),
        SetUpDiscordPrices((discordLern = DiscordClient()), DISCORD_ACCESS_TOKEN_LERN, '2192'),
        SetUpDiscordPrices((discordZork = DiscordClient()), DISCORD_ACCESS_TOKEN_ZORK, 'zork'),
        SetUpDiscordPrices((discordCYDX = DiscordClient()), DISCORD_ACCESS_TOKEN_CYDX, 'cydx'),
      ])
      FiveMinuteJob(
        discordVolume,
        discordVolumeBase,
        discordVolumeArb,
        discordVolumeCombined,
        discordFees,
        discordBaseFees,
        discordArbFees,
        discordOI,
        discordBaseOI,
        discordArbOI,
      )
      OneMinuteJob(
        discordEth,
        discordBtc,
        discordThales,
        discordSNX,
        discordKwenta,
        discordEthBtc,
        discordTlx,
        discordPyth,
        discordLern,
        discordZork,
        discordCYDX,
      )
      SixMinuteJob(discordBuyback)
    }
  } catch (error) {
    console.log(error)
  }
}
