import { EmbedBuilder } from 'discord.js'
import { MarketSummary } from '../types'

export function AllMarkets(dto: MarketSummary[]): EmbedBuilder {
  const embed = new EmbedBuilder()

  return embed
}
