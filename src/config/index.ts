import * as dotenv from 'dotenv'
import * as _ from 'lodash'
import { convertToBoolean } from '../utils/utils'

dotenv.config({ path: '.env' })

export const DISCORD_ACCESS_TOKEN = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN, '')
export const DISCORD_ACCESS_TOKEN_VOLUME = _.defaultTo(process.env.DISCORD_ACCESS_TOKEN_VOLUME, '')

export const ALCHEMY_ID = _.defaultTo(process.env.ALCHEMY_ID, '')

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
