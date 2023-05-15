import { Client } from 'discord.js'
import { scheduleJob } from 'node-schedule'
import { getVolume } from '../actions/volume'
import { setNameActivity } from '../discord/volume'
import { getFees } from '../actions/fees'
import { setNameActivityFees } from '../discord/fees'

export function VolumeJob(discordClient: Client): void {
  console.log('VOLUME job running')
  scheduleJob('*/30 * * * *', async () => {
    const dailyStats = await getVolume()

    if (dailyStats) {
      await setNameActivity(discordClient, dailyStats)
    }
  })
}

// export function FeesJob(discordClient: Client): void {
//   console.log('FEES job running')
//   scheduleJob('*/30 * * * *', async () => {
//     const dailyFees = await getFees(true)
//     const weeklyFees = await getFees(false)
//     if (dailyFees && weeklyFees) {
//       await setNameActivityFees(discordClient, dailyFees.fees, weeklyFees.fees)
//     }
//   })
// }
