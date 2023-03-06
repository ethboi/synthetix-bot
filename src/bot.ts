import { SetUpDiscord } from './discord'
import { DiscordClient } from './clients/discordClient'
import { GetFundingRates } from './kwenta'

export async function Run(): Promise<void> {
  try {
    console.log('Running Bot')
    // set up discord
    await Promise.all([SetUpDiscord(DiscordClient())])

    await GetFundingRates()
  } catch (error) {
    console.log(error)
  }
}
