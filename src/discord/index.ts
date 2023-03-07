import { Client, TextChannel } from 'discord.js'
import { TESTNET } from '../config'
import { FUNDING_RATES_CHANNEL } from '../constants/discordChannels'
import { defaultActivity, defaultName } from '../integrations/discord'

export async function SetUpDiscord(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord bot is online!`)
  })
  discordClient.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
      return
    }

    const fundingChannel = interaction?.guild?.channels.cache.find((channel) => channel.name === FUNDING_RATES_CHANNEL)
    const channelName = (interaction?.channel as TextChannel).name
    const { commandName } = interaction

    if (commandName === 'funding') {
      // report the funding
    }
  })

  await discordClient.login(accessToken)
  if (!TESTNET) {
    defaultActivity(discordClient)
    await defaultName(discordClient)
  }
  return discordClient
}
