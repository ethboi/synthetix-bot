import { Client, ActivityType } from 'discord.js';
import { displayNumber } from '../utils/formatNumber';
import { ethers } from 'ethers';
import axios from 'axios';

// Alchemy API URL
const ALCHEMY_API_URL = 'https://base-mainnet.g.alchemy.com/v2/ZM4ULATqKZpG4-6qyYNiI_LkKVIb5Hc3';

const BASE_BUYBACK_ADDRESS = '0x632cAa10A56343C5e6C0c066735840c096291B18';

// Initialize Web3 with Alchemy
const web3 = new ethers.providers.JsonRpcProvider(ALCHEMY_API_URL);

// Function to find the block number at the start of a day given a day offset
async function findBlockAtStartOfDayUTC(dayOffset: number) {
    const now = new Date();
    now.setUTCDate(now.getUTCDate() + dayOffset);
    const startOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));

    const targetTimestamp = Math.floor(startOfDayUTC.getTime() / 1000);
    
    return await getBlockNumberFromTimestamp(targetTimestamp);
}

// Function to get block number from a specific timestamp
async function getBlockNumberFromTimestamp(targetTimestamp: number) {
    let minBlock = 0;
    let maxBlock = await web3.getBlockNumber();

    while (minBlock <= maxBlock) {
        const midBlock = Math.floor((minBlock + maxBlock) / 2);
        const block = await web3.getBlock(midBlock);
        
        if (block.timestamp < targetTimestamp) {
            minBlock = midBlock + 1;
        } else {
            maxBlock = midBlock - 1;
        }
    }
    
    return minBlock;
}

// Fetch transfer events directly from Alchemy
async function getBaseFees(startBlock: number, endBlock: number) {
    // Prepare the filter for Transfer events to the BuyBacksnx address
    const filter = {
        fromBlock: ethers.utils.hexValue(startBlock),
        toBlock: ethers.utils.hexValue(endBlock),
        topics: [
            ethers.utils.id("Transfer(address,address,uint256)"),
            null,
            ethers.utils.hexZeroPad(BASE_BUYBACK_ADDRESS, 32)
        ]
    };

    // Fetch the events from Alchemy
    const events = await axios.post(ALCHEMY_API_URL, {
        jsonrpc: '2.0',
        method: 'eth_getLogs',
        params: [filter],
        id: 1,
    }).then(response => response.data.result);

    // Detailed logging of fetched events
    // console.log(`Fetched ${events.length} events between blocks ${startBlock} and ${endBlock}`);
    events.forEach((event: any) => {
        const value = ethers.BigNumber.from(event.data).toString();
        const formattedValue = ethers.utils.formatUnits(value, 18);
        // console.log(`Event: ${event.transactionHash}, Block Number: ${event.blockNumber}, Value: ${formattedValue} snxUSD`);
    });

    // Log the first event of the day
    if (events.length > 0) {
      const firstEvent = events[0];
      const firstEventValue = ethers.utils.formatUnits(ethers.BigNumber.from(firstEvent.data).toString(), 18);
      const blockDetails = await web3.getBlock(firstEvent.blockNumber);
      const firstEventTimestamp = new Date(blockDetails.timestamp * 1000).toISOString();
      // console.log(`First Event of the Day: Transaction Hash: ${firstEvent.transactionHash}, Block Number: ${firstEvent.blockNumber}, Value: ${firstEventValue} snxUSD, Timestamp: ${firstEventTimestamp}`);
  }

    // Calculate the total fees from the events
    const totalFees = events.reduce((acc: any, event: any) => {
        const value = ethers.BigNumber.from(event.data).toString();
        return acc + parseFloat(ethers.utils.formatUnits(value, 18))*2.5;
    }, 0);

    console.log(`Total Fees: ${totalFees} snxUSD`);
    return totalFees;
}

// Function to fetch daily fees
export async function getDailyFeesBase() {
    const currentBlock = await web3.getBlockNumber();
    const startOfTodayBlock = await findBlockAtStartOfDayUTC(0);
    const startOfYesterdayBlock = await findBlockAtStartOfDayUTC(-1);
    const endOfYesterdayBlock = startOfTodayBlock - 1; // End of yesterday's last block

    // console.log(`Start of Today Block: ${startOfTodayBlock}`);
    // console.log(`Current Block: ${currentBlock}`);
    // console.log(`Start of Yesterday Block: ${startOfYesterdayBlock}`);
    // console.log(`End of Yesterday Block: ${endOfYesterdayBlock}`);

    const currentFees = await getBaseFees(startOfTodayBlock, currentBlock);
    const previousFees = await getBaseFees(startOfYesterdayBlock, endOfYesterdayBlock);

    return [
        { day: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 0, 0, 0)), fees: currentFees },
        { day: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() - 1, 0, 0, 0)), fees: previousFees }
    ];
}

// Function to set up Discord bot and update its status
export async function SetUpDiscordBaseFees(discordClient: Client, accessToken: string, frontEnd: string) {
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
export async function setNameActivityBaseFees(client: Client, dailyStats: { day: Date, fees: number }[]) {
    try {
        const today = dailyStats[0];
        const prev = dailyStats[1];

        const username = `$${displayNumber(today.fees)} BASE FEES`;
        const activity = `Prev: $${displayNumber(prev.fees)}`;

        console.log('BASE FEES');
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

(async () => {
    const dailyFees = await getDailyFeesBase();
    console.log(dailyFees);
})();

