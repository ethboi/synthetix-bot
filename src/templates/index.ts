import { EmbedBuilder } from 'discord.js'
import { MarketSummary } from '../types/markets'
import formatNumber from '../utils/formatNumber'
import formatUSD from '../utils/formatUSD'
import { AssetColor, DefaultColor, Footer } from './common'

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

  Footer(embed, frontEnd)
  embeds.push(embed)
  return embeds
}

export function MarketRow(embed: EmbedBuilder, dto: MarketSummary): EmbedBuilder {
  return embed.addFields(
    {
      name: `🪙 ${dto.asset}`,
      value: `> ${formatUSD(dto.price, { dps: 2 })}`,
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
      )} (S)\n> \n🔗 **Trade**\n> [[open a trade]](https://kwenta.eth.limo/market/?asset=${dto.originalAsset})`,
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
    .setURL(`https://kwenta.eth.limo/market/?asset=${dto.originalAsset}`)
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
      value: `> [[open a trade]](https://kwenta.eth.limo/market/?asset=${dto.originalAsset})`,
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
