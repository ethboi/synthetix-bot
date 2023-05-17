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

    // DAILY STATS
    try {
      console.log(`Getting Volume & Fees: ${Date.now}`)
      const dailyStats = await getDailyStats()
      if (dailyStats) {
        await Promise.all([
          setNameActivityVolume(discordClientVolume, dailyStats),
          setNameActivityFees(discordClientFees, dailyStats),
        ])
      }
    } catch (ex) {
      console.log(ex)
    }

    // OPEN INTEREST
    try {
      console.log(`Getting Open Interest:  ${Date.now}`)
      const [openInterestPrev, openInterest] = await Promise.all([GetOpenInterest(true), GetOpenInterest(false)])
      await setNameActivityOI(discordClientOI, openInterestPrev, openInterest)
    } catch (ex) {
      console.log(ex)
    }
  })
}
