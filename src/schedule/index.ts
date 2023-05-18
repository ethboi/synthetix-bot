import { Client } from 'discord.js'
import { scheduleJob } from 'node-schedule'
import { getDailyStats } from '../actions/dailyStats'
import { setNameActivityVolume } from '../discord/volume'
import { setNameActivityFees } from '../discord/fees'
import { setNameActivityOI } from '../discord/openInterest'
import { GetOpenInterest } from '../actions/openInterest'

export function FiveMinuteJob(discordClientVolume: Client, discordClientFees: Client, discordClientOI: Client): void {
  scheduleJob('*/5 * * * *', async () => {
    console.log('STATS (FEES / VOLUME) job running')

    try {
      console.log(`Getting Volume & Fees: ${Date.now}`)
      const dailyStats = await getDailyStats()

      if (dailyStats) {
        console.log('Stats found.')
        console.log(dailyStats)
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
