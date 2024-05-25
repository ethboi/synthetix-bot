import { GetTotalOpenInterestBase } from './getMarketSummaryBase';  // Adjust the import path as necessary

export async function GetOpenInterestBase(prev: boolean): Promise<number> {
  return await GetTotalOpenInterestBase(prev);
}
