import { Client } from 'discord.js'
import { scheduleJob } from 'node-schedule'
import { getDailyStats } from '../actions/dailyStats'
import { setNameActivityVolume } from '../discord/volume'
import { setNameActivityFees } from '../discord/fees'
import { setNameActivityOI } from '../discord/openInterest'
import { GetOpenInterest } from '../actions/openInterest'

export function StatsJobs(discordClientVolume: Client, discordClientFees: Client, discordClientOI: Client): void {
  scheduleJob('5,35 * * * *', async () => {
    try {
      console.log('STATS (FEES / VOLUME) job running')
      const dailyStats = await getDailyStats()
      const [openInterestPrev, openInterest] = await Promise.all([GetOpenInterest(true), GetOpenInterest(false)])

      if (dailyStats) {
        await setNameActivityVolume(discordClientVolume, dailyStats)
        await setNameActivityFees(discordClientFees, dailyStats)
        await setNameActivityOI(discordClientOI, openInterestPrev, openInterest)
      }
    } catch (ex) {
      console.log(ex)
      console.log(`:)`)
    }
  })
}
