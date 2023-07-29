import { EmbedBuilder, time } from 'discord.js'
import formatUSD from '../utils/formatUSD'
import { DefaultColor, Footer, WatcherLink } from './common'
import formatNumber from '../utils/formatNumber'
import { kFutureStat, kFuturesTrade } from '../types/kwenta'
import { ReplaceSynths } from '../discord'
import { shortAddress } from '../utils/utils'

export function TraderDiscord(trader: kFutureStat, frontEnd: string): EmbedBuilder[] {
  const messageEmbeds: EmbedBuilder[] = []

  const embed = new EmbedBuilder().setColor(`${DefaultColor(frontEnd)}`)

  if (trader.owner && trader.smartWallet) {
    embed.setDescription(
      `> *Owner:* [${shortAddress(trader.owner)}](${WatcherLink(trader.owner)}) \n> *Smart:* [${shortAddress(
        trader.smartWallet,
      )}](${WatcherLink(trader.smartWallet)})`,
    )
  }

  embed.setTitle(`🧑 ${trader.ens ? trader.ens : 'Trader Summary'}`)
  embed.addFields(
    {
      name: '💵 Pnl',
      value: `> ${formatUSD(trader.pnl)}`,
      inline: true,
    },
    {
      name: '💸 Fees',
      value: `> ${formatUSD(trader.feesPaid)}`,
      inline: true,
    },
    {
      name: '📈 Trades',
      value: `> ${trader.totalTrades}`,
      inline: true,
    },

    {
      name: '🔄 Volume',
      value: `> ${formatUSD(trader.totalVolume)}`,
      inline: true,
    },
    {
      name: '💀 Liquidations',
      value: `> ${trader.liquidations}`,
      inline: true,
    },
    {
      name: '\u200b',
      value: `\u200b`,
      inline: true,
    },
    {
      name: `Trades`,
      value: `Recent trade history. `,
      inline: false,
    },
  )

  if (trader.trades) {
    trader.trades.map((trade) => TradeRow(embed, trade))
  }

  Footer(embed, frontEnd)
  messageEmbeds.push(embed)
  return messageEmbeds
}

function TradeRow(embed: EmbedBuilder, trade: kFuturesTrade) {
  console.log(trade)
  embed.addFields(
    {
      name: `${trade.size > 0 ? '🟢' : '🔴'} ${ReplaceSynths(trade.asset).toUpperCase()}`,
      value: `> *Size:* ${formatNumber(trade.size, { dps: 2 })}`,
      inline: true,
    },
    {
      name: `> ${formatUSD(trade.pnl - trade.feesPaid, { dps: 2 })} Pnl`,
      value: `> *Price:* ${formatUSD(trade.price, { dps: 2 })}`,
      inline: true,
    },
    {
      name: `> ${formatUSD(trade.feesPaid, { dps: 2 })} Fees`,
      value: `> ${time(trade.timestamp, 'R')}`,
      inline: true,
    },
  )
}
