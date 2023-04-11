import { TELEGRAM_CHANNEL, TESTNET } from '../config'
import { Telegraf } from 'telegraf'

export async function PostTelegram(post: string, telegramClient: Telegraf, channel: string = TELEGRAM_CHANNEL) {
  if (TESTNET) {
    console.log(post)
  } else {
    try {
      const response = await telegramClient.telegram.sendMessage(channel, post, {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      })
    } catch (e: any) {
      console.log(e)
    }
  }
}
