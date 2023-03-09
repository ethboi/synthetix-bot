import { EmbedBuilder } from 'discord.js'
import { MarketSummary } from '../types'
import formatNumber from '../utils/formatNumber'
import formatUSD from '../utils/formatUSD'

export function MarketSummariesDiscord(dto: MarketSummary[]): EmbedBuilder[] {
  const embeds: EmbedBuilder[] = []
  const embed = new EmbedBuilder().setColor(`#ffd500`).setTitle(`KWENTA Futures`)

  console.log(dto.length)
  dto.slice(0, 5).map((summary) => {
    return MarketRow(embed, summary)
  })

  Footer(embed)
  embeds.push(embed)
  return embeds
}

export function MarketRow(embed: EmbedBuilder, marketSummary: MarketSummary): EmbedBuilder {
  return embed.addFields(
    {
      name: `💫 ${marketSummary.asset}`,
      value: `> Price: ${marketSummary.price}`,
      inline: true,
    },
    {
      name: `Current Funding Rate`,
      value: `> ${marketSummary.currentFundingRate}`,
      inline: true,
    },
    {
      name: `Max Leverage`,
      value: `> ${marketSummary.maxLeverage}`,
      inline: true,
    },
  )
}

export function StatsDiscord(dto: MarketSummary): EmbedBuilder[] {
  const embeds: EmbedBuilder[] = []
  const thumb = dto.key.slice(0, -4) == 'sAPE' ? 'sAPECOIN' : dto.key.slice(0, -4)
  const embed = new EmbedBuilder()
    .setColor(`${AssetColor(dto.asset)}`)
    .setTitle(`${dto.asset} Market Stats`)
    .setThumbnail(`https://raw.githubusercontent.com/Kwenta/kwenta/perps-v2-dev/assets/png/currencies/${thumb}.png`)
    .setURL(`https://kwenta.eth.limo/market/?asset=${dto.asset}`)
  embed.addFields(
    {
      name: `🏷️ Market Price`,
      value: `>  ${formatUSD(dto.price)}`,
      inline: true,
    },
    {
      name: `🏦 Market Size`,
      value: `> ${formatNumber(dto.marketSize)} ${dto.asset} \n> (${formatUSD(dto.marketSize * dto.price)})`,
      inline: true,
    },
    {
      name: `\u200b`,
      value: `\u200b`,
      inline: true,
    },
    {
      name: `💸 Funding Rate`,
      value: `> *24h:* ${formatNumber(dto.currentFundingRate)}% \n> *APR:* ${formatNumber(
        dto.currentFundingRate * 365,
      )}%`,
      inline: true,
    },
    {
      name: `☄️ Funding Velocity`,
      value: `> *24h:* ${formatNumber(dto.currentFundingVelocity, { showSign: true })}%`,
      inline: true,
    },
    {
      name: `\u200b`,
      value: `\u200b`,
      inline: true,
    },
    {
      name: `🟢 Open Interest (L)`,
      value: `> ${formatUSD(((dto.marketSize + dto.marketSkew) / 2) * dto.price)}`,
      inline: true,
    },
    {
      name: `🔴 Open Interest (S)`,
      value: `> ${formatUSD(((dto.marketSize - dto.marketSkew) / 2) * dto.price)}`,
      inline: true,
    },
    {
      name: `\u200b`,
      value: `\u200b`,
      inline: true,
    },
    {
      name: `〽️Market Skew`,
      value: `> ${formatNumber(dto.marketSkew, { showSign: true })}`,
      inline: true,
    },
    {
      name: `🔗 Trade`,
      value: `> [[open a trade]](https://kwenta.eth.limo/market/?asset=${dto.asset})`,
      inline: true,
    },
    {
      name: `\u200b`,
      value: `\u200b`,
      inline: true,
    },
  )
  Footer(embed)
  embeds.push(embed)
  return embeds
}

export function Footer(embed: EmbedBuilder) {
  embed
    .setFooter({
      iconURL: `https://raw.githubusercontent.com/ethboi/assets/main/kwenta-icon.png`,
      text: `Kwenta`,
    })
    .setTimestamp()
    .setImage('https://raw.githubusercontent.com/ethboi/assets/main/kwenta-footer.jpg')
}

export function AssetColor(market: string) {
  switch (market.toLowerCase()) {
    case 'seth':
      return '#657deb'
    case 'sbtc':
      return '#f7931a'
    case 'link':
      return '#2c5cdc'
    case 'sol':
      return '#b9afef'
    case 'avax':
      return '#e44343'
    case 'aave':
      return '#ab53a0'
    case 'uni':
      return '#f40b7a'
    case 'matic':
      return '#6c43db'
    case 'ape':
      return '#0548cf'
    case 'dydx':
      return '#5a58d8'
    case 'bnb':
      return '#f3bb2c'
    case 'op':
      return '#fb0423'
    case 'doge':
      return '#dcc478'
    case 'xau':
      return '#decb96c'
    case 'xag':
      return '#bfc0c0'
    case 'atom':
      return '#76758c'
    case 'axs':
      return '#0055d4'
    case 'flow':
      return '#04ec8c'
    case 'ftm':
      return '#1b6bfb'
    case 'near':
      return '#5d5d5d '
  }

  return '#ffd500'
}
