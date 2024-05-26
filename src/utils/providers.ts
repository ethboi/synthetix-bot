import { ethers } from 'ethers'
import { ALCHEMY_BASE_API_URL, ALCHEMY_MAINNET_API_URL, ALCHEMY_OP_API_URL } from '../config'

export const providerMainnet = new ethers.providers.JsonRpcProvider(ALCHEMY_MAINNET_API_URL, {
  chainId: 1,
  name: 'ethereum',
})

export const providerOP = new ethers.providers.JsonRpcProvider(ALCHEMY_OP_API_URL, {
  chainId: 10,
  name: 'optimism',
})

export const providerBase = new ethers.providers.JsonRpcProvider(ALCHEMY_BASE_API_URL, {
  chainId: 8453,
  name: 'base',
})
