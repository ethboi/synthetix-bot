import { EmbedBuilder } from 'discord.js'
import { titleCaseWord } from '../utils/formatString'
import { ProviderType } from '../types/arbitrage'
import { urls } from '../constants/urls'

export function Footer(embed: EmbedBuilder, frontEnd: string, version = 0) {
  embed
    .setFooter({
      iconURL: `https://raw.githubusercontent.com/ethboi/assets/main/${frontEnd}-icon.png`,
      text: `${titleCaseWord(frontEnd)}`,
    })
    .setTimestamp()
  if (version > 0) {
    embed.setImage(`https://raw.githubusercontent.com/ethboi/assets/main/${frontEnd}-footer-${version}.jpg`)
  } else {
    embed.setImage(`https://raw.githubusercontent.com/ethboi/assets/main/${frontEnd}-footer.jpg`)
  }
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
      return '#decb96'
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
      return '#5d5d5d'
    case 'arb':
      return '#0548cf'
  }

  return DefaultColor(frontEnd)
}

export function DefaultColor(frontEnd: string) {
  if (frontEnd === 'kwenta') {
    return '#ffd500'
  }
  return '#0548cf'
}

export function ExchangeEmoji(exchange: string) {
  if (exchange === ProviderType.SYNTHETIX) {
    return '⚔️'
  }
  if (exchange === ProviderType.DYDX) {
    return '🟣'
  }
  if (exchange === ProviderType.BYBIT) {
    return '🟠'
  }
  if (exchange === ProviderType.BINANCE) {
    return '🟡'
  }

  return ''
}

export function WatcherLink(smartWallet: string | undefined) {
  if (!smartWallet) {
    return urls.WATCHER
  }

  return `${urls.WATCHER}${smartWallet}`
}

export function Medal(position: number | undefined): string {
  if (position == 1) {
    return '🥇'
  }
  if (position == 2) {
    return '🥈'
  }
  if (position == 3) {
    return '🥉'
  }
  return '🏅'
}
