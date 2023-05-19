import axios from 'axios'
import { ETH_OP, BTC_OP } from '../constants/addresses'
import { urls } from '../constants/urls'
import { Dexscreener, Pair } from '../types/dexscreener'

export async function GetPrices() {
  const addresses = [ETH_OP, BTC_OP]
  const pairs: Pair[] = []

  const [pairsEth, pairsBtc] = await Promise.all([
    axios.get(`${urls.dexscreenerUrl}${ETH_OP}`),
    axios.get(`${urls.dexscreenerUrl}${BTC_OP}`),
  ])

  const dexEth = pairsEth?.data as Dexscreener
  const dexBtc = pairsBtc?.data as Dexscreener

  try {
    const pairEth = dexEth.pairs.find((pair) => pair.baseToken.address.toLowerCase() == ETH_OP.toLowerCase())
    if (pairEth) {
      pairs.push(pairEth)
    }
    const pairBtc = dexBtc.pairs.find((pair) => pair.baseToken.address.toLowerCase() == BTC_OP.toLowerCase())
    if (pairBtc) {
      pairs.push(pairBtc)
    }
  } catch (error) {
    console.log(error)
  }
  console.log(`PAIRS: PAIRS`)
  console.log(pairs)
  console.log(`END: END`)

  return pairs
}
