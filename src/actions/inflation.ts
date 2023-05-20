import { alchemyProvider } from '../utils/providers'
import RpcClient from '../utils/rpcClient'
import { PerpsV2MarketData__factory, SupplySchedule__factory } from '../contracts/typechain'
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
import { Inflation, InflationData, Result } from '../types/inflation'
import { SupplyMintedEvent } from '../contracts/typechain/SupplySchedule'
import fromWei from '../utils/fromWei'
import { wei } from '@synthetixio/wei'
import { calculatePercentageChange } from '../utils/utils'

export async function GetInflation() {
  const url = `${urls.ETHERSCAN_API_URL}?module=logs&action=getLogs&fromBlock=1&toBlock=latest&topic0=0x601e517d4811033fed8290c79b7823ce1ab70258da45400fe2391a3c7432edab&address=0x8d203c458d536fe0f97e9f741bc231eac8cd91cf`
  const inflationData = (await axios.get(url)).data as InflationData
  const supplyMinted = parseSupplyMintedEvent(inflationData.result[inflationData.result.length - 1])
  const prevSupplyMinted = parseSupplyMintedEvent(inflationData.result[inflationData.result.length - 3])

  const change = calculatePercentageChange(
    fromWei(supplyMinted.args.supplyMinted),
    fromWei(prevSupplyMinted.args.supplyMinted),
  )

  const inf: Inflation = {
    supplyMinted: fromWei(supplyMinted.args.supplyMinted),
    lastMintEvent: wei(supplyMinted.args.lastMintEvent, 0, false).toNumber(),
    numberOfWeeksIssued: wei(supplyMinted.args.numberOfWeeksIssued, 0, false).toNumber(),
    change: change,
  }

  console.log(inf)
  return inf
}

function parseSupplyMintedEvent(data: Result): SupplyMintedEvent {
  const parsedEvent = SupplySchedule__factory.createInterface().parseLog(data)
  const event = data as unknown as SupplyMintedEvent
  if ((parsedEvent.args as SupplyMintedEvent['args']).length > 0) {
    event.args = parsedEvent.args as SupplyMintedEvent['args']
  }
  return event
}
