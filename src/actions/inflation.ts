import { alchemyProvider } from '../utils/providers'
import RpcClient from '../utils/rpcClient'
import { PerpsV2MarketData__factory } from '../contracts/typechain'
import { PerpsV2FundingDataContractAddress } from '../constants/addresses'
import printObject from '../utils/printObject'
import { MarketSettings, MarketSummary } from '../types/markets'
import { hexToAscii } from '../utils/formatString'
import fromBigNumber from '../utils/fromBigNumber'
import { ethers } from 'ethers'
import EthDater from 'ethereum-block-by-date'
import moment from 'moment'
import { urls } from '../constants/urls'
import axios from 'axios'
import { InflationData } from '../types/inflation'

export async function GetInflation() {
  const url = `${urls.ETHERSCAN_API_URL}?module=logs&action=getLogs&fromBlock=1&toBlock=latest&topic0=0x601e517d4811033fed8290c79b7823ce1ab70258da45400fe2391a3c7432edab&address=0x8d203c458d536fe0f97e9f741bc231eac8cd91cf`
  const inflationData = (await axios.get(url)).data as InflationData

  console.log(inflationData)
}
