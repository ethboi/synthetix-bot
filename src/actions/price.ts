import axios from 'axios'
import { ETH_OP, BTC_OP, LYRA_OP, THALES_OP, KWENTA_OP, SNX_OP } from '../constants/addresses'
import { urls } from '../constants/urls'
import { Dexscreener, Pair } from '../types/dexscreener'

export async function GetPrices() {
  const pairs: Pair[] = []

  const [pairsEth, pairsBtc, pairsLyra, pairsThales, pairsSNX, pairsKwenta] = await Promise.all([
    axios.get(`${urls.dexscreenerUrl}${ETH_OP}`),
    axios.get(`${urls.dexscreenerUrl}${BTC_OP}`),
    axios.get(`${urls.dexscreenerUrl}${LYRA_OP}`),
    axios.get(`${urls.dexscreenerUrl}${THALES_OP}`),
    axios.get(`${urls.dexscreenerUrl}${SNX_OP}`),
    axios.get(`${urls.dexscreenerUrl}${KWENTA_OP}`),
  ])

  const dexEth = pairsEth?.data as Dexscreener
  const dexBtc = pairsBtc?.data as Dexscreener
  const dexLyra = pairsLyra?.data as Dexscreener
  const dexThales = pairsThales?.data as Dexscreener
  const dexSNX = pairsSNX?.data as Dexscreener
  const dexKwenta = pairsKwenta?.data as Dexscreener

  try {
    const pairEth = dexEth.pairs.find((pair) => pair.baseToken.address.toLowerCase() == ETH_OP.toLowerCase())
    if (pairEth) {
      pairs.push(pairEth)
    }
    const pairBtc = dexBtc.pairs.find((pair) => pair.baseToken.address.toLowerCase() == BTC_OP.toLowerCase())
    if (pairBtc) {
      pairs.push(pairBtc)
    }

    const pairLyra = dexLyra.pairs.find((pair) => pair.baseToken.address.toLowerCase() == LYRA_OP.toLowerCase())
    if (pairLyra) {
      pairs.push(pairLyra)
    }

    const pairThales = dexThales.pairs.find((pair) => pair.baseToken.address.toLowerCase() == THALES_OP.toLowerCase())
    if (pairThales) {
      pairs.push(pairThales)
    }

    const pairSNX = dexSNX.pairs.find((pair) => pair.baseToken.address.toLowerCase() == SNX_OP.toLowerCase())
    if (pairSNX) {
      pairs.push(pairSNX)
    }

    const pairKwenta = dexKwenta.pairs.find((pair) => pair.baseToken.address.toLowerCase() == KWENTA_OP.toLowerCase())
    if (pairKwenta) {
      pairs.push(pairKwenta)
    }
  } catch (error) {
    console.log(error)
  }
  console.log(`PAIRS: PAIRS`)
  console.log(pairs)
  console.log(`END: END`)

  return pairs
}
