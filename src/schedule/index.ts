import { Client } from 'discord.js'
import { scheduleJob } from 'node-schedule'
import { getVolume } from '../actions/volume'
import { setNameActivity } from '../discord/volume'

export function VolumeJob(discordClient: Client): void {
  console.log('30 min VOLUME job running')
  scheduleJob('*/30 * * * *', async () => {
    const prevStats = await getVolume(true)
    const stats = await getVolume(false)
    if (prevStats && stats) {
      await setNameActivity(discordClient, prevStats.total, prevStats.trades, stats.total, stats.trades)
    }
  })
}
