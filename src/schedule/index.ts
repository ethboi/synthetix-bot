import { Client } from 'discord.js'
import { scheduleJob } from 'node-schedule'
import { getDailyStats } from '../actions/dailyStats'
import { setNameActivityVolume } from '../discord/volume'
import { setNameActivityFees } from '../discord/fees'
import { setNameActivityOI } from '../discord/openInterest'
import { GetOpenInterest } from '../actions/openInterest'

export function StatsJobs(discordClientVolume: Client, discordClientFees: Client, discordClientOI: Client): void {
  scheduleJob('5,35 * * * *', async () => {
    console.log('STATS (FEES / VOLUME) job running')

    try {
      console.log(`Getting Volume & Fees: ${Date.now}`)
      const dailyStats = await getDailyStats()
      if (dailyStats) {
        await Promise.all([
          setNameActivityVolume(discordClientVolume, dailyStats),
          setNameActivityFees(discordClientFees, dailyStats),
        ])
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

export function TestJob(): void {
  scheduleJob('*/1 * * * *', async () => {
    console.log(`Running job ${Date.now()}`)
  })
}
