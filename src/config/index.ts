import * as dotenv from 'dotenv'
import * as _ from 'lodash'
import { convertToBoolean } from '../utils/utils'

dotenv.config({ path: '.env' })

export const DISCORD_ACCESS_TOKEN = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN, '')
export const DISCORD_ACCESS_TOKEN_VOLUME = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_VOLUME, '')
export const DISCORD_ACCESS_TOKEN_VOLUME_BASE = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_VOLUME_BASE, '')
export const DISCORD_ACCESS_TOKEN_VOLUME_COMBINED = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_VOLUME_COMBINED, '')
export const DISCORD_ACCESS_TOKEN_FEES = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_FEES, '')
export const DISCORD_ACCESS_TOKEN_OI = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_OI, '')
export const DISCORD_ACCESS_TOKEN_BASE_FEES = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_BASE_FEES, '')
export const DISCORD_ACCESS_TOKEN_BASE_OI = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_BASE_OI, '')
export const DISCORD_ACCESS_TOKEN_ETH = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_ETH, '')
export const DISCORD_ACCESS_TOKEN_BTC = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_BTC, '')
export const DISCORD_ACCESS_TOKEN_BUYBACK = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_BUYBACK, '') //New Buyback Bot (Inflationbot offline)
export const DISCORD_ACCESS_TOKEN_THALES = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_THALES, '')
export const DISCORD_ACCESS_TOKEN_SNX = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_SNX, '')
export const DISCORD_ACCESS_TOKEN_KWENTA = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_KWENTA, '')
export const DISCORD_ACCESS_TOKEN_ETHBTC = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_ETHBTC, '')
export const DISCORD_ACCESS_TOKEN_PYTH = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_PYTH, '')
export const DISCORD_ACCESS_TOKEN_TLX = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_TLX, '')
export const DISCORD_ACCESS_TOKEN_LERN = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_LERN, '')
export const DISCORD_ACCESS_TOKEN_ZORK = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_ZORK, '')
export const DISCORD_ACCESS_TOKEN_CYDX = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_CYDX, '')

export const BASESCAN_API = _.defaultTo(process.env.BASESCAN_API, '')
export const ALCHEMY_BASE_API_URL = _.defaultTo(process.env.ALCHEMY_BASE_API_URL, '')
export const ALCHEMY_OP_API_URL = _.defaultTo(process.env.ALCHEMY_OP_API_URL, '')
export const ALCHEMY_MAINNET_API_URL = _.defaultTo(process.env.ALCHEMY_MAINNET_API_URL, '')

export const TWITTER_ENABLED: boolean = _.defaultTo(
  convertToBoolean(process.env.TWITTER_ENABLED as string),
  false,
) as boolean

export const TELEGRAM_ENABLED: boolean = _.defaultTo(
  convertToBoolean(process.env.TELEGRAM_ENABLED as string),
  true,
) as boolean

export const DISCORD_ENABLED: boolean = _.defaultTo(
  convertToBoolean(process.env.DISCORD_ENABLED as string),
  true,
) as boolean

export const TESTNET: boolean = _.defaultTo(convertToBoolean(process.env.TESTNET as string), true) as boolean

export const FRONTEND = _.defaultTo(process.env.FRONTEND, '') //synthetix //kwenta
export const DISCORD_CHANNEL = _.defaultTo(process.env.DISCORD_CHANNEL, '')

export const TELEGRAM_ACCESS_TOKEN = _.defaultTo(process.env.TELEGRAM_ACCESS_TOKEN, '')
export const TELEGRAM_CHANNEL = _.defaultTo(process.env.TELEGRAM_CHANNEL, '')

export const LOG_TOKEN = _.defaultTo(process.env.LOG_TOKEN, '')
export const LOG_CHANNEL = _.defaultTo(process.env.LOG_CHANNEL, '')

export const BYBIT_API_KEY = _.defaultTo(process.env.BYBIT_API_KEY, '')
export const BYBIT_API_SECRET = _.defaultTo(process.env.BYBIT_API_SECRET, '')

export const BINANCE_API_KEY = _.defaultTo(process.env.BINANCE_API_KEY, '')
export const BINANCE_API_SECRET = _.defaultTo(process.env.BINANCE_API_SECRET, '')
