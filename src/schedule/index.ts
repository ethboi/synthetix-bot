import { Client } from 'discord.js'
import { scheduleJob } from 'node-schedule'
import { getVolume } from '../actions/volume'
import { setNameActivity } from '../discord/volume'
import { getFees } from '../actions/fees'
import { setNameActivityFees } from '../discord/fees'

export function VolumeJob(discordClient: Client): void {
  console.log('30 VOLUME job running')
  scheduleJob('0,30 * * * *', async () => {
    const prevStats = await getVolume(true)
    const stats = await getVolume(false)
    if (prevStats && stats) {
      await setNameActivity(discordClient, prevStats.total, prevStats.trades, stats.total, stats.trades)
    }
  })
}

// export function FeesJob(discordClient: Client): void {
//   console.log('3 hour min FEES job running')
//   scheduleJob('* */3 * * *', async () => {
//     const dailyFees = await getFees(true)
//     const weeklyFees = 100 //await getFees(false)
//     if (dailyFees && weeklyFees) {
//       await setNameActivityFees(discordClient, dailyFees.fees, weeklyFees)
//     }
//   })
// }
