import { EmbedBuilder } from 'discord.js'
import formatUSD from '../utils/formatUSD'
import { DefaultColor, Footer, Medal, WatcherLink } from './common'
import { kFutureStat } from '../types/kwenta'
import { shortAddress } from '../utils/utils'
import { urls } from '../constants/urls'

export function LeaderBoardDiscord(dto: kFutureStat[], frontEnd: string, isTop: boolean): EmbedBuilder[] {
  const messageEmbeds: EmbedBuilder[] = []
  const embed = new EmbedBuilder()
    .setColor(`${DefaultColor(frontEnd)}`)
    .setTitle(`${isTop ? 'Top' : 'Bottom'} ${dto.length} ${isTop ? 'Profitable' : 'Rekt'} Traders All Time`)
    .addFields(
      { name: 'Trader', value: '-------------', inline: true },
      { name: `\u200b`, value: '-------------', inline: true },
      { name: '💵 Profit', value: '-------------', inline: true },
    )

  dto.slice(0, 5).map((stat, index) => {
    return LeaderBoardRow(embed, stat, index)
  })
  messageEmbeds.push(embed)
  const stats: kFutureStat[] = []
  let outerIndex = 5

  dto.slice(5).reduce((group, stat, index) => {
    group.push(stat)
    if (index % 5 === 4) {
      const embed = new EmbedBuilder().setColor(`${DefaultColor(frontEnd)}`)

      group.map((stat) => {
        const row = LeaderBoardRow(embed, stat, outerIndex)
        outerIndex++
        return row
      })
      messageEmbeds.push(embed)
      group = []
    }
    return group
  }, stats)

  messageEmbeds.map((embed) => embed.setImage(urls.SPACER))

  if (messageEmbeds.length > 0) {
    const embedLast = messageEmbeds.pop()
    if (embedLast) {
      Footer(embedLast, frontEnd, 1)
      messageEmbeds.push(embedLast)
    }
  }
  return messageEmbeds
}

export function LeaderBoardRow(embed: EmbedBuilder, stat: kFutureStat, index: number): EmbedBuilder {
  return embed.addFields(
    {
      name: `> ${Medal(index + 1)} ${index + 1}.`,
      value: `> [${shortAddress(stat.owner)}](${WatcherLink(stat.owner)})`,
      inline: true,
    },
    {
      name: `> 💀 ${stat.liquidations} `,
      value: `> *Fees:* ${formatUSD(Math.abs(stat.feesPaid))}`,
      inline: true,
    },
    {
      name: `> ${formatUSD(stat.pnl)}`,
      value: `> *Trades:* ${stat.totalTrades} `,
      inline: true,
    },
  )
}
