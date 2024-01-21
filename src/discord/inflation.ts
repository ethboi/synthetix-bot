
// Import necessary libraries
import { Client, ActivityType } from 'discord.js';
import { displayNumber } from '../utils/formatNumber';
import { GetBuybackData } from '../actions/buyback'; // Import the new function for fetching buyback data
import { Buyback } from '../types/inflation'; // Import the new type for buyback data

export async function SetUpDiscordBuyback(discordClient: Client, accessToken: string, frontEnd: string) {
  discordClient.on('ready', async () => {
    console.debug(`Discord Buyback/Burn bot is online!`);
    const buyback = await GetBuybackData();
    await setNameActivityBuyback(discordClient, buyback);
    
  });

  await discordClient.login(accessToken);
  return discordClient;
}

export async function setNameActivityBuyback(client: Client, buyback: Buyback) {
  try {
    const username = `${displayNumber(buyback.burnedSNX)} SNX`; 
    const date = new Date(buyback.lastBurnEvent);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthIndex = date.getUTCMonth()

    const monthName = monthIndex >= 0 && monthIndex < monthNames.length ? monthNames[monthIndex] : 'Unknown';

    const day = date.getUTCDate()
    const year = date.getUTCFullYear()

    const dayStr = day < 10 ? '0' + day : '' + day
    const shortDateStr = dayStr + ' ' + monthName.toUpperCase() + ' ' + year
    const activity = `Burn: ${shortDateStr} `

    console.log('BUYBACK')
    console.log(username)
    console.log(activity)

    client.guilds.cache.map(
      async (guild) => await guild.members.cache.find((m) => m.id == client.user?.id)?.setNickname(username),
    )
    client.user?.setActivity(activity, {
      type: ActivityType.Watching,
    })
  } catch (e: any) {
    console.log(e);
  }
}


