import { ethers } from 'ethers'

import contractData from '../contracts/abis/PerpsMarketProxy.json'
import EthDater from 'ethereum-block-by-date'
import moment from 'moment'
import { providerBase } from '../utils/providers'

const contractAddress = contractData.address
const perpsMarketProxyABI = contractData.abi
const contract = new ethers.Contract(contractAddress, perpsMarketProxyABI, providerBase)

async function getBlockByTimestamp(provider: ethers.providers.JsonRpcProvider, timestamp: number) {
  const dater = new EthDater(provider)
  const date = moment.unix(timestamp)
  const blockResult = await dater.getDate(date, true, false)
  return blockResult.block
}

export async function GetTotalOpenInterestBase(prev: boolean): Promise<number> {
  let blockTag = undefined
  if (prev) {
    const dayInSeconds = 86400 // One day in seconds
    const timestamp = Math.floor(Date.now() / 1000) - dayInSeconds
    const fromBlock = await getBlockByTimestamp(providerBase, timestamp)
    blockTag = ethers.utils.hexValue(fromBlock)
  }

  const marketIds = await contract.getMarkets()

  let totalOI = 0

  for (const marketId of marketIds) {
    try {
      const summary = await contract.getMarketSummary(marketId, { blockTag })

      const [, size, , , , indexPrice] = summary

      const marketSize = parseFloat(ethers.utils.formatUnits(size, 18))
      const price = parseFloat(ethers.utils.formatUnits(indexPrice, 18))

      totalOI += marketSize * price
    } catch (error) {
      console.error(`Error fetching summary for market ${marketId.toString()}:`, error)
    }
  }

  return totalOI
}
