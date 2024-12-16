import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Client, ActivityType } from 'discord.js';
import { displayNumber } from '../utils/formatNumber';

// Import the ABI JSON
import perpsMarketProxyABI from '../contracts/abis/PerpsMarketProxyBase.json';
import { ALCHEMY_BASE_API_URL } from '../config';

// Set up Web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider("https://base-mainnet.g.alchemy.com/v2/Ikqy1XKMqh4SqTEjhf5rdlxEcdqD5RBI"));
const contractAddress = '0x0A2AF931eFFd34b81ebcc57E3d3c9B1E1dE1C9Ce'; // Replace with the correct Base contract address
const perpsMarketProxyContract = new web3.eth.Contract(perpsMarketProxyABI as AbiItem[], contractAddress);

// Function to fetch `OrderSettled` events and calculate protocol fees
async function fetchOrderSettledFees(startBlock: number, endBlock: number): Promise<number> {
  let totalProtocolFees = 0;

  const orderSettledEvents = await perpsMarketProxyContract.getPastEvents('OrderSettled', {
    fromBlock: startBlock,
    toBlock: endBlock,
  });

  orderSettledEvents.forEach((event: any) => {
    const totalFees = parseFloat(Web3.utils.fromWei(event.returnValues.totalFees, 'ether'));
    const settlementReward = parseFloat(Web3.utils.fromWei(event.returnValues.settlementReward, 'ether'));
    
    const protocolFees = totalFees - settlementReward;
    totalProtocolFees += protocolFees;
  });

  return totalProtocolFees;
}

// Function to get the timestamp for the start of the day in UTC
function getStartOfDayUTCTimestamp(dayOffset: number): number {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() + dayOffset);
  const startOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return Math.floor(startOfDayUTC.getTime() / 1000);
}

// Function to find the block number closest to a given timestamp
async function getBlockClosestToTimestamp(timestamp: number): Promise<number> {
  const latestBlock = await web3.eth.getBlock('latest');
  let minBlock = 0;
  let maxBlock = latestBlock.number;

  while (minBlock <= maxBlock) {
    const midBlock = Math.floor((minBlock + maxBlock) / 2);
    const midBlockData = await web3.eth.getBlock(midBlock);

    const midBlockTime = typeof midBlockData.timestamp === 'string' ? parseInt(midBlockData.timestamp) : midBlockData.timestamp;

    if (midBlockTime < timestamp) {
      minBlock = midBlock + 1;
    } else {
      maxBlock = midBlock - 1;
    }
  }
  return minBlock;
}

// Function to find the block number at the start of a day given a day offset
async function findBlockAtStartOfDayUTC(dayOffset: number): Promise<number> {
  const startOfDayTimestamp = getStartOfDayUTCTimestamp(dayOffset);
  return await getBlockClosestToTimestamp(startOfDayTimestamp);
}

// Main function to calculate protocol fees for the day
export async function getDailyFeesBase() {
  const currentBlock = await web3.eth.getBlockNumber();
  const oneDayAgoBlock = await findBlockAtStartOfDayUTC(0);
  const twoDaysAgoBlock = await findBlockAtStartOfDayUTC(-1);

  const currentProtocolFees = await fetchOrderSettledFees(oneDayAgoBlock, currentBlock);
  const previousProtocolFees = await fetchOrderSettledFees(twoDaysAgoBlock, oneDayAgoBlock);

  console.log(`Current Base 24h Protocol Fees: ${currentProtocolFees.toFixed(4)} snxUSD`);
  console.log(`Previous Base 24h Protocol Fees: ${previousProtocolFees.toFixed(4)} snxUSD`);

  return [
    {
      day: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 0, 0, 0)),
      fees: currentProtocolFees,
    },
    {
      day: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() - 1, 0, 0, 0)),
      fees: previousProtocolFees,
    },
  ];
}

// Function to set up Discord bot and update its status with protocol fees
export async function SetUpDiscordBaseFees(discordClient: Client, accessToken: string) {
  discordClient.on('ready', async (client) => {
    console.debug(`Discord Base Fees bot is online!`);

    const dailyStats = await getDailyFeesBase();

    if (dailyStats) {
      await setNameActivityBaseFees(discordClient, dailyStats);
    }
  });

  await discordClient.login(accessToken);
  return discordClient;
}

// Function to set the bot's activity and nickname
export async function setNameActivityBaseFees(client: Client, dailyStats: { day: Date; fees: number }[]) {
  try {
    const currentDate = new Date(dailyStats[0].day);
    const daysToIncl = daysSinceLastWednesday(currentDate);

    const epochDays = dailyStats.slice(0, daysToIncl);
    const epochFees = epochDays.reduce((accumulator, dailyStat) => accumulator + dailyStat.fees, 0);

    const username = `$${displayNumber(epochFees)} FEES`;
    const activity = `24h Fees: $${displayNumber(dailyStats[0].fees)}`;

    console.log('Base Fees');
    console.log(username);
    console.log(activity);

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

function daysSinceLastWednesday(today: Date): number {
  const dayOfWeek = today.getDay(); // 0 = Sunday, 3 = Wed, 6 = Sat
  const diff = dayOfWeek < 3 ? dayOfWeek + 4 : dayOfWeek === 3 ? 7 : dayOfWeek - 3;
  return diff;
}

// To execute the function and log the daily fees
(async () => {
  const dailyFees = await getDailyFeesBase();
  console.log(dailyFees);
})();
