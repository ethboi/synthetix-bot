import { ethers } from 'ethers'
import CachedStaticJsonRpcProvider from './CachedStaticJsonRpcProvider'
import { ALCHEMY_BASE_API_URL } from '../config'

export const alchemyProviderBase = new ethers.providers.JsonRpcProvider(ALCHEMY_BASE_API_URL)

export const BASE_NETWORK_CONFIG = {
  name: 'Base',
  shortName: 'Base',
  chainId: 8453,
  network: 'base',
  walletRpcUrl: ALCHEMY_BASE_API_URL,
  readRpcUrls: [ALCHEMY_BASE_API_URL],
  blockExplorerUrl: 'https://basescan.org/',
  iconUrls: [],
}

export const alchemyProviderBaseMainnet = new CachedStaticJsonRpcProvider(
  BASE_NETWORK_CONFIG.readRpcUrls,
  BASE_NETWORK_CONFIG.chainId,
)
