import { GetTotalOpenInterestArb } from './getMarketSummaryArb';  // Adjust the import path as necessary

export async function GetOpenInterestArb(prev: boolean): Promise<number> {
  return await GetTotalOpenInterestArb(prev);
}
