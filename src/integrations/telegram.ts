import { TELEGRAM_CHANNEL, TESTNET } from '../config'
import { Telegraf } from 'telegraf'

export async function PostTelegram(post: string, telegramClient: Telegraf, channel: string = TELEGRAM_CHANNEL) {
  if (TESTNET) {
    console.log(post)
  } else {
    try {
      await telegramClient.telegram.sendMessage(channel, post, {
        parse_mode: 'HTML',
      })
    } catch (e: any) {
      console.log(e)
    }
  }
}
