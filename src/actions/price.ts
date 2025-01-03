import axios from 'axios';
import {
  ETH_OP,
  BTC_OP,
  THALES_OP,
  KWENTA_OP,
  SNX_OP,
  TLX_OP,
  PYTH_OP,
  ZORK_OP,
  LERN_OP,
  CYDX_OP,
} from '../constants/addresses';
import { urls } from '../constants/urls';
import { Dexscreener, Pair } from '../types/dexscreener';

async function fetchCoinGeckoPrice(coinId: string): Promise<string | null> {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);
    if (response.data && response.data[coinId] && response.data[coinId].usd) {
      return response.data[coinId].usd.toString();
    }
  } catch (error) {
    console.error(`Error fetching price from CoinGecko for coinId: ${coinId}`, error);
  }
  return null;
}

export async function GetPrices() {
  const pairs: Pair[] = [];

  const [pairsEth, pairsBtc, pairsThales, pairsSNX, pairsKwenta, pairsTLX, pairsPYTH, pairsLERN, pairsZORK, pairsCYDX] =
    await Promise.all([
      axios.get(`${urls.dexscreenerUrl}${ETH_OP}`),
      axios.get(`${urls.dexscreenerUrl}${BTC_OP}`),
      axios.get(`${urls.dexscreenerUrl}${THALES_OP}`),
      axios.get(`${urls.dexscreenerUrl}${SNX_OP}`),
      axios.get(`${urls.dexscreenerUrl}${KWENTA_OP}`),
      axios.get(`${urls.dexscreenerUrl}${TLX_OP}`),
      axios.get(`${urls.dexscreenerUrl}${PYTH_OP}`),
      axios.get(`${urls.dexscreenerUrl}${LERN_OP}`),
      axios.get(`${urls.dexscreenerUrl}${ZORK_OP}`),
      axios.get(`${urls.dexscreenerUrl}${CYDX_OP}`),
    ]);

  const dexEth = pairsEth?.data as Dexscreener;
  const dexBtc = pairsBtc?.data as Dexscreener;
  const dexThales = pairsThales?.data as Dexscreener;
  const dexSNX = pairsSNX?.data as Dexscreener;
  const dexKwenta = pairsKwenta?.data as Dexscreener;
  const dexTLX = pairsTLX?.data as Dexscreener;
  const dexPYTH = pairsPYTH?.data as Dexscreener;
  const dexLERN = pairsLERN?.data as Dexscreener;
  const dexZORK = pairsZORK?.data as Dexscreener;
  const dexCYDX = pairsCYDX?.data as Dexscreener;

  try {
    const findPair = (dexData: Dexscreener, address: string): Pair | null => {
      if (!dexData || !dexData.pairs) {
        console.error(`No pairs found for address: ${address}`);
        return null;
      }
      const pair = dexData.pairs.find((pair: Pair) => pair.baseToken.address.toLowerCase() === address.toLowerCase());
      if (!pair) {
        console.error(`Pair not found for address: ${address}`);
        return null;
      }
      return pair;
    };

    const addPair = (pair: Pair | null) => {
      if (pair) pairs.push(pair);
    };

    addPair(findPair(dexEth, ETH_OP));
    addPair(findPair(dexBtc, BTC_OP));
    addPair(findPair(dexThales, THALES_OP));
    addPair(findPair(dexSNX, SNX_OP));
    addPair(findPair(dexKwenta, KWENTA_OP));
    addPair(findPair(dexTLX, TLX_OP));
    addPair(findPair(dexPYTH, PYTH_OP));
    addPair(findPair(dexLERN, LERN_OP));

    let pairZORK = findPair(dexZORK, ZORK_OP);
    if (!pairZORK) {
      const zorkPrice = await fetchCoinGeckoPrice('zorksees'); // Use the CoinGecko ID for ZORK
      if (zorkPrice !== null) {
        pairZORK = {
          chainId: 'solana',
          dexId: 'coingecko',
          url: `https://www.coingecko.com/en/coins/zorksees`, // Update the URL if needed
          pairAddress: ZORK_OP,
          baseToken: { address: ZORK_OP, name: 'ZORK', symbol: 'ZORK' },
          quoteToken: { address: '', name: 'USD', symbol: 'USD' },
          priceUsd: zorkPrice,
          priceNative: '',
          txns: {
            h24: { buys: 0, sells: 0 },
            h6: { buys: 0, sells: 0 },
            h1: { buys: 0, sells: 0 },
            m5: { buys: 0, sells: 0 },
          },
          volume: { h24: 0, h6: 0, h1: 0, m5: 0 },
          priceChange: { h24: 0, h6: 0, h1: 0, m5: 0 },
          liquidity: { usd: 0, base: 0, quote: 0 },
          fdv: 0,
          pairCreatedAt: 0,
        };
        pairs.push(pairZORK);
      }
    } else {
      pairs.push(pairZORK);
    }

    addPair(findPair(dexCYDX, CYDX_OP));
  } catch (error) {
    console.log('Error processing pairs:', error);
  }

  return pairs;
}
