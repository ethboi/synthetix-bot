import { Client, ActivityType } from 'discord.js';
import { displayNumber } from '../utils/formatNumber';
import axios from 'axios';

// Define the type for the fees response
interface FeeData {
  ts: string;
  daily_exchange_fees: number;
}

// Function to fetch daily fees for Arbitrum using the new API endpoint
export async function getDailyFeesArb() {
  try {
    const response = await axios.get('https://synthetix-cache-api-f7db01015ec1.herokuapp.com/api/v1/perp-stats/exchange-fees/daily?chain=arbitrum');
    const feesData = response.data.arbitrum;

    const currentDate = new Date();
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);

    // Find today's and yesterday's fees
    const todayFeesData = feesData.find((fee:FeeData) => new Date(fee.ts).getUTCDate() === currentDate.getUTCDate());
    const yesterdayFeesData = feesData.find((fee:FeeData) => new Date(fee.ts).getUTCDate() === yesterday.getUTCDate());

    const currentFees = todayFeesData ? todayFeesData.daily_exchange_fees : 0;
    const previousFees = yesterdayFeesData ? yesterdayFeesData.daily_exchange_fees : 0;

    console.log(`Current 24h ARBITRUM Fees: ${currentFees.toFixed(6)} snxUSD`);
    console.log(`Previous 24h ARBITRUM Fees: ${previousFees.toFixed(6)} snxUSD`);

    return [
      {
        day: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 0, 0, 0)),
        fees: currentFees,
      },
      {
        day: new Date(
          Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() - 1, 0, 0, 0),
        ),
        fees: previousFees,
      },
    ];
  } catch (error) {
    console.error('Error fetching fees from API:', error);
    return [];
  }
}

// Function to set up Discord bot and update its status
export async function SetUpDiscordArbFees(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Arb Fees bot is online!`);

    const dailyStats = await getDailyFeesArb();

    if (dailyStats) {
      await setNameActivityArbFees(discordClient, dailyStats);
    }
  });

  await discordClient.login(accessToken);
  return discordClient;
}

// Function to set the bot's activity and nickname
export async function setNameActivityArbFees(client: Client, dailyStats: { day: Date; fees: number }[]) {
  try {
    const currentDate = new Date(dailyStats[0].day);
    const daysToIncl = daysSinceLastWednesday(currentDate);

    const epochDays = dailyStats.slice(0, daysToIncl);
    const epochFees = epochDays.reduce((accumulator, dailyStat) => {
      return accumulator + dailyStat.fees;
    }, 0);

    const username = `$${displayNumber(epochFees)} FEES`;
    const activity = `24h: $${displayNumber(dailyStats[0].fees)}`;

    console.log('Arb FEES');
    console.log(username);
    console.log(activity);

    client.guilds.cache.map(
      async (guild) => await guild.members.cache.find((m) => m.id == client.user?.id)?.setNickname(username),
    );
    client.user?.setActivity(activity, {
      type: ActivityType.Watching,
    });
  } catch (e: any) {
    console.log(e);
  }
}

function daysSinceLastWednesday(today: Date): number {
  const dayOfWeek = today.getDay(); // 0 = Sunday, 3 = Wed, 6 = Sat
  const diff = dayOfWeek < 3 ? dayOfWeek + 4 : dayOfWeek === 3 ? 7 : dayOfWeek - 3;
  return diff;
}

// To execute the function and log the daily fees
(async () => {
  const dailyFees = await getDailyFeesArb();
  console.log(dailyFees);
})();
