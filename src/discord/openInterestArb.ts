import { Client, ActivityType } from 'discord.js';
import formatNumber, { displayNumber } from '../utils/formatNumber';
import { GetOpenInterestArb } from '../actions/openInterestArb';  // Adjust the import path if necessary

// Function to set up Discord bot and update its status for Open Interest (OI) on Arbitrum
export async function SetUpDiscordArbOI(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Arb OI bot is online!`);

    // Fetch previous and current Open Interest using the Arbitrum calculation
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
