import { GetMarketSummariesBase } from './getMarketSummaryBase';  // Adjust the import path as necessary
import { MarketSummary } from '../types/markets';

async function getMarketSummariesWithRetriesBase(prevDay?: number, retries = 3): Promise<MarketSummary[]> {
  try {
    return await GetMarketSummariesBase(prevDay);
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... (${3 - retries + 1})`);
      return getMarketSummariesWithRetriesBase(prevDay, retries - 1);
    } else {
      throw error;
    }
  }
}

export async function GetOpenInterestBase(prev: boolean) {
  const day = 86400000;
  let markets: MarketSummary[] = [];

  if (prev) {
    const prevDay = Math.floor((Date.now() - day) / 1000);
    markets = (await getMarketSummariesWithRetriesBase(prevDay)).filter((market): market is MarketSummary => market !== null);
  } else {
    markets = (await getMarketSummariesWithRetriesBase()).filter((market): market is MarketSummary => market !== null);
  }

  const openInterest = markets.reduce((accumulator, market) => {
    return accumulator + market.marketValue;
  }, 0);

  return openInterest;
}
