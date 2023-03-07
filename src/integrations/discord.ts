import { ActionRowBuilder, ActivityType, ButtonBuilder, Client, EmbedBuilder, TextChannel } from 'discord.js'
import printObject from '../utils/printObject'
import { TESTNET } from '../config'

export async function PostDiscord(
  embed: EmbedBuilder[],
  rows: ActionRowBuilder<ButtonBuilder>[],
  client: Client<boolean>,
  channelName: string,
) {
  if (TESTNET) {
    printObject(embed)
  } else {
    try {
      const channels = client.channels.cache
        .filter((value) => (value as TextChannel)?.name == channelName)
        .map(async (channel) => {
          console.log(`found channel: ${channelName}`)
          await (channel as TextChannel).send({ embeds: embed, components: rows })
        })
    } catch (e: any) {
      console.log(e)
    }
  }
}

export function defaultActivity(client: Client) {
  try {
    client.user?.setActivity(`24h: 00%`, { type: ActivityType.Watching })
  } catch (e: any) {
    console.log(e)
  }
}

export async function defaultName(client: Client) {
  try {
    await client.user?.setUsername(`DEFAULT USERNAME`)
  } catch (e: any) {
    console.log(e)
  }
}
