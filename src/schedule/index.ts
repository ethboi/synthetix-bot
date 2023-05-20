import { Client } from 'discord.js'
import { scheduleJob } from 'node-schedule'
import { getDailyStats } from '../actions/dailyStats'
import { setNameActivityVolume } from '../discord/volume'
import { setNameActivityFees } from '../discord/fees'
import { setNameActivityOI } from '../discord/openInterest'
import { GetOpenInterest } from '../actions/openInterest'
import { GetPrices } from '../actions/price'
import { BTC_OP, ETH_OP } from '../constants/addresses'
import { setNameActivityPrice } from '../discord/prices'
import { GetInflation } from '../actions/inflation'
import { setNameActivityInflation } from '../discord/inflation'

export function FiveMinuteJob(discordClientVolume: Client, discordClientFees: Client, discordClientOI: Client): void {
  scheduleJob('*/5 * * * *', async () => {
    console.log('STATS (FEES / VOLUME) job running')

    try {
      console.log(`Getting Volume & Fees: ${Date.now}`)
      const dailyStats = await getDailyStats()

      if (dailyStats) {
        await Promise.all([
          setNameActivityVolume(discordClientVolume, dailyStats),
          setNameActivityFees(discordClientFees, dailyStats),
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

export function OneMinuteJob(discordClientEth: Client, discordClientBtc: Client): void {
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
    } catch (e) {
      console.log(e)
    }
  })
}

export function DailyJob(discordInflation: Client): void {
  scheduleJob('5,10 0 * * *', async () => {
    try {
      console.log(`Getting Inflation: ${Date.now()}`)
      const inf = await GetInflation()
      if (inf) {
        await setNameActivityInflation(discordInflation, inf)
      }
    } catch (e) {
      console.log(e)
    }
  })
}
