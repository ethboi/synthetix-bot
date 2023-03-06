import { ethers } from 'ethers'
import { alchemyProvider } from '../utils/providers'
import RpcClient from '../utils/rpcClient'
import { PerpsV2MarketData__factory } from '../contracts/typechain'
import { PerpsV2FundingDataContractAddress } from '../constants/addresses'
import printObject from '../utils/printObject'

export async function GetFundingRates() {
  // todo get the funding rates
  console.log('Get Funding Rates')
  const rpcClient = new RpcClient(alchemyProvider)
  const contract = PerpsV2MarketData__factory.connect(PerpsV2FundingDataContractAddress, rpcClient.provider)

  const fundingRates = await contract.allProxiedMarketSummaries()

  printObject(fundingRates)
}
