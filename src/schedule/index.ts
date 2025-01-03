import { Client } from 'discord.js'
import { scheduleJob } from 'node-schedule'
import { getDailyStats } from '../actions/dailyStats'
import { setNameActivityVolume } from '../discord/volume'
import { setNameActivityVolumeBase } from '../discord/volumeBase'
import { setNameActivityVolumeArb } from '../discord/volumeArb'
import { combineStats, setNameActivityVolumeCombined } from '../discord/volumeCombined'
import { setNameActivityFees } from '../discord/fees'
import { setNameActivityOI } from '../discord/openInterest'
import { GetOpenInterest } from '../actions/openInterest'
import { GetPrices } from '../actions/price'
import {
  BTC_OP,
  ETH_OP,
  KWENTA_OP,
  LERN_OP,
  PYTH_OP,
  SNX_OP,
  THALES_OP,
  TLX_OP,
  ZORK_OP,
  CYDX_OP,
} from '../constants/addresses'
import { setNameActivityPrice, setNameActivityRatio } from '../discord/prices'
import { GetBuybackData } from '../actions/buyback'
import { setNameActivityBuyback } from '../discord/buyback'
import { getDailyStatsBase } from '../actions/volumeBase'
import { getDailyStatsArb } from '../actions/volumeArb'
import { getDailyFeesBase, setNameActivityBaseFees } from '../discord/feesBase'
import { getDailyFeesArb, setNameActivityArbFees } from '../discord/feesArb'
import { GetOpenInterestBase } from '../actions/openInterestBase'
import { GetOpenInterestArb } from '../actions/openInterestArb'
import { setNameActivityBaseOI } from '../discord/openInterestBase'
import { setNameActivityArbOI } from '../discord/openInterestArb'
// import { getDailyStatsArb } from '../actions/volumeArb'

export function FiveMinuteJob(
  discordClientVolume: Client,
  discordClientVolumeBase: Client,
  discordClientVolumeArb: Client,
  discordClientVolumeCombined: Client,
  discordClientFees: Client,
  discordClientBaseFees: Client,
  discordClientArbFees: Client,
  discordClientOI: Client,
  discordClientBaseOI: Client,
  discordClientArbOI: Client,
): void {
  scheduleJob('*/5 * * * *', async () => {
    console.log('STATS (FEES / VOLUME) job running')

    try {
      console.log(`Getting Volume & Fees: ${Date.now}`)
      const dailyStatsOP = await getDailyStats()
      const dailyStatsBase = await getDailyStatsBase()
      const dailyStatsArb = await getDailyStatsArb()
      const dailyFeesBase = await getDailyFeesBase()
      const dailyFeesArb = await getDailyFeesArb()
      const dailyStatsCombined = combineStats(dailyStatsOP, dailyStatsBase, dailyStatsArb)
      const [openInterestPrev, openInterest] = await Promise.all([
        GetOpenInterestBase(true),
        GetOpenInterestBase(false),
      ])
      const [openInterestPrevArb, openInterestArb] = await Promise.all([
        GetOpenInterestArb(true),
        GetOpenInterestArb(false),
      ])

      if (dailyStatsOP) {
        await Promise.all([
          setNameActivityVolume(discordClientVolume, dailyStatsOP),
          setNameActivityVolumeBase(discordClientVolumeBase, dailyStatsBase),
          setNameActivityVolumeArb(discordClientVolumeArb, dailyStatsArb),
          setNameActivityVolumeCombined(discordClientVolumeCombined, dailyStatsCombined),
          setNameActivityFees(discordClientFees, dailyStatsOP),
          setNameActivityBaseFees(discordClientBaseFees, dailyFeesBase),
          setNameActivityArbFees(discordClientArbFees, dailyFeesArb),
          setNameActivityBaseOI(discordClientBaseOI, openInterestPrev, openInterest),
          setNameActivityArbOI(discordClientArbOI, openInterestPrevArb, openInterestArb),
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
  discordThales: Client,
  discordSNX: Client,
  discordKwenta: Client,
  discordEthBtc: Client,
  discordTlx: Client,
  discordPyth: Client,
  discordLern: Client,
  discordZork: Client,
  discordCYDX: Client,
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

      //TLX
      const tlxPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == TLX_OP.toLowerCase())
      if (tlxPair) {
        console.log(tlxPair.priceUsd)
        await setNameActivityPrice(discordTlx, tlxPair, 'tlx')
      }

      //PYTH
      const pythPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == PYTH_OP.toLowerCase())
      if (pythPair) {
        console.log(pythPair.priceUsd)
        await setNameActivityPrice(discordPyth, pythPair, 'pyth')
      }

      //Lernitas
      const lernPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == LERN_OP.toLowerCase())
      if (lernPair) {
        console.log(lernPair.priceUsd)
        await setNameActivityPrice(discordLern, lernPair, '2192', 4)
      }

      //ZORK
      const zorkPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == ZORK_OP.toLowerCase())
      if (zorkPair) {
        console.log(zorkPair.priceUsd)
        await setNameActivityPrice(discordZork, zorkPair, 'zork')
      }

      //CYDX
      const cydxPair = pairs.find((pair) => pair.baseToken.address.toLowerCase() == CYDX_OP.toLowerCase())
      if (cydxPair) {
        console.log(cydxPair.priceUsd)
        await setNameActivityPrice(discordCYDX, cydxPair, 'cydx', 4)
      }

      if (ethPair && btcPair) {
        await setNameActivityRatio(discordEthBtc, ethPair, btcPair)
      }
    } catch (e) {
      console.log(e)
    }
  })
}

export function SixMinuteJob(discordClientBuyback: Client): void {
  scheduleJob('*/6 * * * *', async () => {
    try {
      console.log(`Getting Buyback/Burn every 6 minutes: ${Date.now}`)
      const BBB = await GetBuybackData()
      if (BBB) {
        await setNameActivityBuyback(discordClientBuyback, BBB)
      }
    } catch (e) {
      console.log(e)
    }
  })
}
