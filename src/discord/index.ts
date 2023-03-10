import { ChatInputCommandInteraction, Client, GuildBasedChannel, TextChannel } from 'discord.js'
import { FRONTEND, TESTNET } from '../config'
import { FUNDING_RATES_CHANNEL } from '../constants/discordChannels'
import { defaultActivity, defaultName } from '../integrations/discord'
import { GetMarketSummaries, GetStats } from '../actions'
import { MarketSummariesDiscord, StatsDiscord } from '../templates'

export async function SetUpDiscord(discordClient: Client, accessToken: string, frontEnd: string) {
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
      await FundingInteraction(
        channelName,
        interaction as ChatInputCommandInteraction,
        fundingChannel as GuildBasedChannel,
        commandName,
        frontEnd,
      )
    }

    if (commandName === 'stats') {
      await StatsInteraction(
        channelName,
        interaction as ChatInputCommandInteraction,
        fundingChannel as GuildBasedChannel,
        commandName,
        frontEnd,
      )
    }
  })

  await discordClient.login(accessToken)
  if (!TESTNET) {
    defaultActivity(discordClient)
    await defaultName(discordClient)
  }
  return discordClient
}

async function FundingInteraction(
  channelName: string,
  interaction: ChatInputCommandInteraction,
  channel: GuildBasedChannel,
  commandName: string,
  frontEnd: string,
) {
  if (channelName === FUNDING_RATES_CHANNEL) {
    await interaction.deferReply()

    const marketSummaries = await GetMarketSummaries()
    const embeds = MarketSummariesDiscord(marketSummaries, frontEnd)
    await interaction.editReply({ embeds: embeds })
  } else {
    await interaction.reply(`Command ${commandName} only available in <#${channel?.id}>`)
  }
}

async function StatsInteraction(
  channelName: string,
  interaction: ChatInputCommandInteraction,
  channel: GuildBasedChannel,
  commandName: string,
  frontEnd: string,
) {
  if (channelName === FUNDING_RATES_CHANNEL) {
    await interaction.deferReply()
    const market = MapMarket(interaction.options.getString('market'))
    const markets = await GetMarketSummaries()
    const stats = await GetStats(markets, market)

    if (stats) {
      const embeds = StatsDiscord(stats, frontEnd)
      await interaction.editReply({ embeds: embeds })
    } else {
      await interaction.editReply(
        `Market not found, available markets: ${markets
          .flatMap((x) => ReplaceSynths(x.asset.toLowerCase()))
          .join(', ')}.`,
      )
    }
  } else {
    await interaction.reply(`Command ${commandName} only available in <#${channel?.id}>`)
  }
}

function MapMarket(market: string | null) {
  if (!market) {
    return 'eth'
  }
  return market
}

function ReplaceSynths(market: string) {
  if (market.toLowerCase() == 'seth') {
    return 'eth'
  }
  if (market.toLowerCase() == 'sbtc') {
    return 'btc'
  }
  return market
}
