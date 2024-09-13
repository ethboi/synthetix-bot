import { Client, ActivityType } from 'discord.js';
import formatNumber, { displayNumber } from '../utils/formatNumber';
import axios from 'axios';

// Define the API endpoint for fetching daily open interest data
const OI_API_URL = 'https://synthetix-cache-api-f7db01015ec1.herokuapp.com/api/v1/perp-market-history/open-interest/daily?chain=arbitrum';

// Function to fetch the open interest from the API
async function GetOpenInterestArb(previousDay: boolean): Promise<number> {
  try {
    const response = await axios.get(OI_API_URL);
    const data = response.data.arbitrum;

    if (!data || data.length === 0) {
      throw new Error('No data returned from the API');
    }

    // Get the index for the previous day (yesterday) or current day (today)
    const index = previousDay ? 1 : 0;

    const openInterest = data[index]?.daily_open_interest;
    if (openInterest === undefined) {
      throw new Error(`No open interest found for index ${index}`);
    }

    return openInterest;
  } catch (error) {
    console.error('Error fetching Open Interest data:', error);
    return 0;
  }
}

// Function to set up Discord bot and update its status for Open Interest (OI)
export async function SetUpDiscordArbOI(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Arb OI bot is online!`);

    // Fetch previous and current Open Interest using the API
    const [openInterestPrev, openInterest] = await Promise.all([GetOpenInterestArb(true), GetOpenInterestArb(false)]);

    if (openInterest !== undefined && openInterestPrev !== undefined) {
      await setNameActivityArbOI(discordClient, openInterestPrev, openInterest);
    }
  });

  await discordClient.login(accessToken);
  return discordClient;
}

// Function to set the bot's activity and nickname based on Open Interest (OI)
export async function setNameActivityArbOI(client: Client, openInterestPrev: number, openInterest: number) {
  try {
    const username = `$${displayNumber(openInterest)} OI`;
    const change = ((openInterest - openInterestPrev) / openInterestPrev) * 100;
    const changeDirection = openInterest > openInterestPrev;
    const activity = `24h: ${formatNumber(change, { dps: 2, showSign: true })}% (${changeDirection ? '↗' : '↘'})`;

    console.log('Arb OI');
    console.log(username);
    console.log(activity);

    // Update nickname and activity for the bot
    client.guilds.cache.map(
      async (guild) => await guild.members.cache.find((m) => m.id === client.user?.id)?.setNickname(username),
    );
    client.user?.setActivity(activity, {
      type: ActivityType.Watching,
    });
  } catch (e: any) {
    console.log(e);
  }
}

// To execute the function and log the daily OI
(async () => {
  const [openInterestPrev, openInterest] = await Promise.all([GetOpenInterestArb(true), GetOpenInterestArb(false)]);
  console.log(`Previous Day OI: ${openInterestPrev}, Current Day OI: ${openInterest}`);
})();
