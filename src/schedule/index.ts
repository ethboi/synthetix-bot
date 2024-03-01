import { Client } from 'discord.js'
import { scheduleJob } from 'node-schedule'
import { getDailyStats } from '../actions/dailyStats'
import { setNameActivityVolume } from '../discord/volume'
import { setNameActivityFees } from '../discord/fees'
import { setNameActivityOI } from '../discord/openInterest'
import { GetOpenInterest } from '../actions/openInterest'
import { GetPrices } from '../actions/price'
import { BTC_OP, ETH_OP, KWENTA_OP, LYRA_OP, SNX_OP, THALES_OP } from '../constants/addresses'
import { setNameActivityPrice, setNameActivityRatio } from '../discord/prices'
import { setNameActivityTraders } from '../discord/traders'
import { setNameActivityTrades } from '../discord/trades'
import { setNameActivityBuyback } from '../discord/buyback'

export function FiveMinuteJob(
  discordClientVolume: Client,
  discordClientFees: Client,
  discordClientOI: Client,
  discordClientTraders: Client,
  discordClientTrades: Client,
): void {
  scheduleJob('*/5 * * * *', async () => {
    console.log('STATS (FEES / VOLUME) job running')

    try {
      console.log(`Getting Volume & Fees: ${Date.now}`)
      const dailyStats = await getDailyStats()

      if (dailyStats) {
        await Promise.all([
          setNameActivityVolume(discordClientVolume, dailyStats),
          setNameActivityFees(discordClientFees, dailyStats),
          setNameActivityTraders(discordClientTraders, dailyStats),
          setNameActivityTrades(discordClientTrades, dailyStats),
        ])
      } else {
        console.log(`Stats not found.`)
      }
    } catch (e) {
      console.log(e)
    }

    // OPEN INTEREST
    try {
      console.log(`Getting Open Interest:  ${Date.now}`)
      const [openInterestPrev, openInterest] = await Promise.all([GetOpenInterest(true), GetOpenInterest(false)])
      await setNameActivityOI(discordClientOI, openInterestPrev, openInterest)
    } catch (e) {
      console.log(e)
    }
  })
}

export function OneMinuteJob(
  discordClientEth: Client,
  discordClientBtc: Client,
  discordLyra: Client,
  discordThales: Client,
  discordSNX: Client,
  discordKwenta: Client,
  discordEthBtc: Client,
): void {
  scheduleJob('*/1 * * * *', async () => {
    try {
      console.log(`Getting Prices: ${Date.now()}`)
      const pairs = await GetPrices()
      //ETH
      const ethPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == ETH_OP.toLowerCase())
      if (ethPair) {
        console.log(ethPair.priceUsd)
        await setNameActivityPrice(discordClientEth, ethPair, 'eth')
      }

      //BTC
      const btcPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == BTC_OP.toLowerCase())
      if (btcPair) {
        console.log(btcPair.priceUsd)
        await setNameActivityPrice(discordClientBtc, btcPair, 'btc')
      }

      //LYRA
      const lyraPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == LYRA_OP.toLowerCase())
      if (lyraPair) {
        console.log(lyraPair.priceUsd)
        await setNameActivityPrice(discordLyra, lyraPair, 'lyra')
      }

      //THALES
      const thalesPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == THALES_OP.toLowerCase())
      if (thalesPair) {
        console.log(thalesPair.priceUsd)
        await setNameActivityPrice(discordThales, thalesPair, 'thales')
      }

      //SNX
      const snxPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == SNX_OP.toLowerCase())
      if (snxPair) {
        console.log(snxPair.priceUsd)
        await setNameActivityPrice(discordSNX, snxPair, 'snx')
      }

      //KWENTA
      const kwentaPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == KWENTA_OP.toLowerCase())
      if (kwentaPair) {
        console.log(kwentaPair.priceUsd)
        await setNameActivityPrice(discordKwenta, kwentaPair, 'kwenta')
      }

      if (ethPair && btcPair) {
        await setNameActivityRatio(discordEthBtc, ethPair, btcPair)
      }
    } catch (e) {
      console.log(e)
    }
  })
}

// Getting Buyback and Burn Data every 6 Minutes:
export function SixMinuteJob(discordClientBuyback: Client): void {
  scheduleJob('*/6 * * * *', async () => {
    // Updated the schedule to run every 6 minutes
    try {
      console.log(`Getting Buyback/Burn every 6 minutes: ${Date.now}`)
      await setNameActivityBuyback(discordClientBuyback)
    } catch (e) {
      console.log(e)
    }
  })
}
