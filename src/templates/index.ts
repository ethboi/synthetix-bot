import { EmbedBuilder } from 'discord.js'
import { MarketSummary } from '../types/markets'
import formatNumber from '../utils/formatNumber'
import { titleCaseWord } from '../utils/formatString'
import formatUSD from '../utils/formatUSD'

export function MarketSummariesDiscord(dto: MarketSummary[], frontEnd: string): EmbedBuilder[] {
  const embeds: EmbedBuilder[] = []
  const embed = new EmbedBuilder()
    .setColor(`${DefaultColor(frontEnd)}`)
    .setTitle(`Top 5 ${frontEnd.toUpperCase()} Futures`)

  console.log(dto.length)
  dto.slice(0, 5).map((summary) => {
    return MarketRow(embed, summary)
  })
  const summaries: MarketSummary[] = []

  embeds.push(embed)
  Footer(embed, frontEnd)
  embeds.push(embed)

  // dto.slice(5).reduce((group, summary, index) => {
  //   group.push(summary)
  //   if (index % 5 === 4) {
  //     const embed = new EmbedBuilder().setColor(`${DefaultColor(frontEnd)}`)
  //     group.map((summary) => {
  //       return MarketRow(embed, summary)
  //     })

  //     group = []
  //   }
  //   return group
  // }, summaries)

  // embeds.map((embed) => embed.setImage(`https://raw.githubusercontent.com/ethboi/assets/main/${frontEnd}-divider.jpg`))
  // if (embeds.length > 0) {
  //   const embedLast = embeds.pop()
  //   if (embedLast) {
  //     Footer(embedLast, frontEnd)
  //     embeds.push(embedLast)
  //   }
  // }
  return embeds
}

export function MarketRow(embed: EmbedBuilder, dto: MarketSummary): EmbedBuilder {
  return embed.addFields(
    {
      name: `🪙 ${dto.asset}`,
      value: `> ${formatUSD(dto.price)}`,
      inline: true,
    },
    {
      name: `💸 Funding`,
      value: `> *24h:* ${formatNumber(dto.currentFundingRate * 100)}% \n> *APR:* ${formatNumber(
        dto.currentFundingRate * 365 * 100,
      )}%\n> \n☄️ **Velocity**\n> *24h:* ${formatNumber(dto.currentFundingVelocity * 100, {
        showSign: true,
      })}%\n \u200b`,
      inline: true,
    },
    {
      name: `Open Interest`,
      value: `> 🟢 ${formatUSD(((dto.marketSize + dto.marketSkew) / 2) * dto.price)} (L)\n> 🔴 ${formatUSD(
        ((dto.marketSize - dto.marketSkew) / 2) * dto.price,
      )} (S)\n> \n🔗 **Trade**\n> [[open a trade]](https://kwenta.eth.limo/market/?asset=${SynthAsset(dto.asset)})`,
      inline: true,
    },
  )
}

export function StatsDiscord(dto: MarketSummary, frontEnd: string): EmbedBuilder[] {
  const embeds: EmbedBuilder[] = []
  const thumb = dto.key.slice(0, -4) == 'sAPE' ? 'sAPECOIN' : dto.key.slice(0, -4)
  const embed = new EmbedBuilder()
    .setColor(`${AssetColor(dto.asset, frontEnd)}`)
    .setTitle(`${dto.asset} Funding Rates`)
    .setThumbnail(`https://raw.githubusercontent.com/Kwenta/kwenta/perps-v2-dev/assets/png/currencies/${thumb}.png`)
    .setURL(`https://kwenta.eth.limo/market/?asset=${SynthAsset(dto.asset)}`)
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
      value: `> *24h:* ${formatNumber(dto.currentFundingRate * 100)}% \n> *APR:* ${formatNumber(
        dto.currentFundingRate * 365 * 100,
      )}%`,
      inline: true,
    },
    {
      name: `☄️ Funding Velocity`,
      value: `> *24h:* ${formatNumber(dto.currentFundingVelocity * 100, { showSign: true })}%`,
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
      name: `〽️Premium`,
      value: `> ${formatNumber((10000 * dto.marketSkew) / (dto.settings?.skewScale as number), { showSign: true })} bp`,
      inline: true,
    },
    {
      name: `🔗 Trade`,
      value: `> [[open a trade]](https://kwenta.eth.limo/market/?asset=${SynthAsset(dto.asset)})`,
      inline: true,
    },
    {
      name: `\u200b`,
      value: `\u200b`,
      inline: true,
    },
  )
  Footer(embed, frontEnd)
  embeds.push(embed)
  return embeds
}

export function Footer(embed: EmbedBuilder, frontEnd: string) {
  embed
    .setFooter({
      iconURL: `https://raw.githubusercontent.com/ethboi/assets/main/${frontEnd}-icon.png`,
      text: `${titleCaseWord(frontEnd)}`,
    })
    .setTimestamp()
    .setImage(`https://raw.githubusercontent.com/ethboi/assets/main/${frontEnd}-footer.jpg`)
}

export function AssetColor(market: string, frontEnd: string) {
  switch (market.toLowerCase()) {
    case 'eth':
      return '#657deb'
    case 'btc':
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

  return DefaultColor(frontEnd)
}

function DefaultColor(frontEnd: string) {
  if (frontEnd === 'kwenta') {
    return '#ffd500'
  }
  return '#0548cf'
}

function SynthAsset(asset: string) {
  if (asset.toLowerCase() == 'eth') {
    return 'sETH'
  }
  if (asset.toLowerCase() == 'btc') {
    return 'sBTC'
  }
}
