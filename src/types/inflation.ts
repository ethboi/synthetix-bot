export type InflationData = {
  status: string
  message: string
  result: Result[]
}

export type Result = {
  address: string
  topics: string[]
  data: string
  blockNumber: string
  blockHash: string
  timeStamp: string
  gasPrice: string
  gasUsed: string
  logIndex: string
  transactionHash: string
  transactionIndex: string
}

export type Inflation = {
  supplyMinted: number
  lastMintEvent: number
  numberOfWeeksIssued: number
  change: number
}
