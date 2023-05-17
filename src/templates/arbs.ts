import { EmbedBuilder } from 'discord.js'
import { AssetColor, DefaultColor, ExchangeEmoji, Footer } from './common'
import { IFundingRate } from '../models/funding-rate'
import { ProviderRates } from '../types/arbitrage'
import formatNumber from '../utils/formatNumber'
import { SELECTED_MARKETS } from '../actions/funding'

export function ArbDiscord(dto: ProviderRates, frontEnd: string): EmbedBuilder[] {
  //console.log(dto)
  const embeds: EmbedBuilder[] = []
  const market = Object.values(dto)[0][0].id

  const thumb =
    Object.values(dto)[0][0].market.slice(0, -4) == 'sAPE' ? 'sAPECOIN' : Object.values(dto)[0][0].market.slice(0, -4)
  const embed = new EmbedBuilder()
    .setColor(`${AssetColor(market, frontEnd)}`)
    .setTitle(`${market} Funding Rate Arbs`)
    .setThumbnail(`https://raw.githubusercontent.com/Kwenta/kwenta/perps-v2-dev/assets/png/currencies/${thumb}.png`)
    .setURL(`https://kwenta.eth.limo/market/?asset=${market}`)

  Object.entries(dto).map((providerRates) => {
    if (providerRates[1] && providerRates[1].length > 0) {
      FundingRow(embed, providerRates)
    }
  })

  // embed.addFields({
  //   name: '',
  //   value: `🔗 **Trade**\n> [[open a trade]](https://kwenta.eth.limo/market/?asset=${synthetixMarket})`,
  //   inline: true,
  // })

  Footer(embed, frontEnd, 1)
  embeds.push(embed)
  return embeds
}

export function FundingRow(embed: EmbedBuilder, dto: [key: string, value: IFundingRate[]]): EmbedBuilder {
  const funding = dto[1][0]
  embed.addFields(
    {
      name: `${ExchangeEmoji(dto[0])} ${dto[0]}`,
      value: `${funding.spot ? '> $' + formatNumber(funding.spot, { dps: 2 }) : '\u200b'}`,
      inline: true,
    },
    {
      name: `💸 Funding`,
      value: `> *1h:* ${formatNumber(funding.rate1h)}% \n> *24hr:* ${formatNumber(
        funding.rate24h,
      )}%\n> *1wk:* ${formatNumber(funding.rate7d)}%\n \u200b`,
      inline: true,
    },
    {
      name: `💵 APR`,
      value: `> ${formatNumber(funding.apr)}%`,
      inline: true,
    },
  )

  return embed
}

export function ArbsDiscord(dto: ProviderRates, frontEnd: string): EmbedBuilder[] {
  const embeds: EmbedBuilder[] = []
  const embed = new EmbedBuilder().setColor(`${DefaultColor(frontEnd)}`).setTitle(`Funding Rate Arbs`)

  SELECTED_MARKETS.map((market) => {
    const marketRate: { [key: string]: IFundingRate[] } = {}
    for (const [key, value] of Object.entries(dto)) {
      marketRate[key] = value.filter((obj) => obj.id === market)
    }
    MarketRow(embed, marketRate)
  })

  Footer(embed, frontEnd, 1)
  embeds.push(embed)
  return embeds
}

export function MarketRow(embed: EmbedBuilder, dto: { [key: string]: IFundingRate[] }): EmbedBuilder {
  const synthetixRate = Object.values(dto)[0][0]

  embed.addFields({
    name: `🪙 ${synthetixRate.id}`,
    value: `> $${formatNumber(Number(synthetixRate.spot), { dps: 2 })}`,
    inline: true,
  })

  const keys: string[] = Object.keys(dto)
  const keyPairs: [string, string | undefined][] = []
  for (let i = 0; i < keys.length; i += 2) {
    if (i + 1 < keys.length) {
      keyPairs.push([keys[i], keys[i + 1]])
    } else {
      keyPairs.push([keys[i], undefined]) // If there is an odd number of keys, the last pair will have undefined
    }
  }

  keyPairs.forEach(([provider1, provider2]) => {
    const fundingRates1 = dto[provider1][0]
    const fundingRates2 = provider2 ? dto[provider2][0] : undefined
    let fund2 = ''
    if (provider2 && fundingRates2) {
      fund2 = `\n\n> **${ExchangeEmoji(provider2)} ${provider2}**\n> *24hr:* ${formatNumber(
        fundingRates2.rate24h,
      )}%\n> *APR:* ${formatNumber(fundingRates2.apr)}%\n\u200b`
    }

    embed.addFields({
      name: `> ${ExchangeEmoji(provider1)} ${provider1}`,
      value: `> *24hr:* ${formatNumber(fundingRates1.rate24h)}%\n> *APR:* ${formatNumber(fundingRates1.apr)}% ${
        fundingRates2 ? fund2 : ''
      }`,
      inline: true,
    })
  })

  return embed
}
