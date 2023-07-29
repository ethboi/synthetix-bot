import { ChatInputCommandInteraction, Client, GuildBasedChannel, TextChannel } from 'discord.js'
import { TESTNET, DISCORD_CHANNEL } from '../config'
import { defaultActivity, defaultName } from '../integrations/discord'
import { GetMarketSummaries, GetStats } from '../actions'
import { MarketSummariesDiscord, StatsDiscord } from '../templates'
import { getFundingRates } from '../actions/funding'
import { ArbDiscord, ArbsDiscord } from '../templates/arbs'
import { HelpDiscord } from '../templates/help'
import { getTrader } from '../actions/trader'
import { TraderDiscord } from '../templates/trader'
import { GetLeaderBoard } from '../actions/leaderboard'
import { LeaderBoardDiscord } from '../templates/leaderboard'

export async function SetUpDiscord(discordClient: Client, accessToken: string, frontEnd: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord bot is online!`)
  })
  discordClient.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
      return
    }

    const fundingChannel = interaction?.guild?.channels.cache.find((channel) => channel.name === DISCORD_CHANNEL)
    const channelName = (interaction?.channel as TextChannel).name
    const { commandName } = interaction

    if (commandName === 'markets') {
      await MarketsInteraction(
        channelName,
        interaction as ChatInputCommandInteraction,
        fundingChannel as GuildBasedChannel,
        commandName,
        frontEnd,
      )
    }

    if (commandName === 'funding') {
      await FundingInteraction(
        channelName,
        interaction as ChatInputCommandInteraction,
        fundingChannel as GuildBasedChannel,
        commandName,
        frontEnd,
      )
    }

    if (commandName === 'arb') {
      await ArbInteraction(
        channelName,
        interaction as ChatInputCommandInteraction,
        fundingChannel as GuildBasedChannel,
        commandName,
        frontEnd,
      )
    }

    if (commandName === 'arbs') {
      await ArbsInteraction(
        channelName,
        interaction as ChatInputCommandInteraction,
        fundingChannel as GuildBasedChannel,
        commandName,
        frontEnd,
      )
    }

    if (commandName === 'help') {
      await HelpInteraction(
        channelName,
        interaction as ChatInputCommandInteraction,
        fundingChannel as GuildBasedChannel,
        commandName,
        frontEnd,
      )
    }

    if (commandName === 'trader') {
      await TraderInteraction(
        channelName,
        interaction as ChatInputCommandInteraction,
        fundingChannel as GuildBasedChannel,
        commandName,
        frontEnd,
      )
    }

    if (commandName === 'winners') {
      await LeaderBoardInteraction(
        channelName,
        interaction as ChatInputCommandInteraction,
        fundingChannel as GuildBasedChannel,
        commandName,
        frontEnd,
      )
    }

    if (commandName === 'losers') {
      await LeaderBoardInteraction(
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
    //await defaultName(discordClient, frontEnd)
  }
  return discordClient
}

async function MarketsInteraction(
  channelName: string,
  interaction: ChatInputCommandInteraction,
  channel: GuildBasedChannel,
  commandName: string,
  frontEnd: string,
) {
  await interaction.deferReply()
  const marketSummaries = await GetMarketSummaries()
  const embeds = MarketSummariesDiscord(marketSummaries, frontEnd)
  await interaction.editReply({ embeds: embeds })
}

async function FundingInteraction(
  channelName: string,
  interaction: ChatInputCommandInteraction,
  channel: GuildBasedChannel,
  commandName: string,
  frontEnd: string,
) {
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
}

async function ArbInteraction(
  channelName: string,
  interaction: ChatInputCommandInteraction,
  channel: GuildBasedChannel,
  commandName: string,
  frontEnd: string,
) {
  await interaction.deferReply()
  const market = MapMarket(interaction.options.getString('market'))
  const markets = await GetMarketSummaries()
  const stats = await GetStats(markets, market)
  if (!stats) {
    await interaction.editReply(
      `Market not found, available markets: ${markets
        .flatMap((x) => ReplaceSynths(x.asset.toLowerCase()))
        .join(', ')}.`,
    )
  }
  const arbs = await getFundingRates(market)
  const embeds = ArbDiscord(arbs, frontEnd)
  await interaction.editReply({ embeds: embeds })
}

async function ArbsInteraction(
  channelName: string,
  interaction: ChatInputCommandInteraction,
  channel: GuildBasedChannel,
  commandName: string,
  frontEnd: string,
) {
  await interaction.deferReply()
  const arbs = await getFundingRates()
  const embeds = ArbsDiscord(arbs, frontEnd)
  await interaction.editReply({ embeds: embeds })
}

async function HelpInteraction(
  channelName: string,
  interaction: ChatInputCommandInteraction,
  channel: GuildBasedChannel,
  commandName: string,
  frontEnd: string,
) {
  const help = HelpDiscord()
  await interaction.reply(help)
}

function MapMarket(market: string | null) {
  if (!market) {
    return 'eth'
  }
  return market
}

async function TraderInteraction(
  channelName: string,
  interaction: ChatInputCommandInteraction,
  channel: GuildBasedChannel,
  commandName: string,
  frontEnd: string,
) {
  await interaction.deferReply()
  const address = interaction.options.getString('address')

  if (!address) {
    return await interaction.editReply(`Error retrieving trader.`)
  }

  const trader = await getTrader(address)

  if (trader) {
    const embeds = TraderDiscord(trader, frontEnd)
    await interaction.editReply({ embeds: embeds })
  } else {
    await interaction.editReply(`Trader not found.`)
  }
}

async function LeaderBoardInteraction(
  channelName: string,
  interaction: ChatInputCommandInteraction,
  channel: GuildBasedChannel,
  commandName: string,
  frontEnd: string,
) {
  await interaction.deferReply()
  const getTop = commandName == 'winners'
  const leaderboard = await GetLeaderBoard(getTop)

  if (leaderboard) {
    const embeds = LeaderBoardDiscord(leaderboard, frontEnd, getTop)
    await interaction.editReply({ embeds: embeds })
  } else {
    await interaction.editReply('Leaderboard not found')
  }
}

export function ReplaceSynths(market: string) {
  if (market.toLowerCase() == 'seth') {
    return 'eth'
  }
  if (market.toLowerCase() == 'sbtc') {
    return 'btc'
  }
  return market
}
