import { ethers } from 'ethers'
import CachedStaticJsonRpcProvider from './CachedStaticJsonRpcProvider'

const ALCHEMY_ID_BASE_OI = '1YR9YqriQcXSG81zIZz-3SKAblDA8QL4'
export const alchemyProviderBase = new ethers.providers.JsonRpcProvider(
  `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_ID_BASE_OI}`,
)

export const BASE_NETWORK_CONFIG = {
  name: 'Base',
  shortName: 'Base',
  chainId: 8453,
  network: 'base',
  walletRpcUrl: `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_ID_BASE_OI}`,
  readRpcUrls: [`https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_ID_BASE_OI}`],
  blockExplorerUrl: 'https://basescan.org/',
  iconUrls: [],
}

export const alchemyProviderBaseMainnet = new CachedStaticJsonRpcProvider(
  BASE_NETWORK_CONFIG.readRpcUrls,
  BASE_NETWORK_CONFIG.chainId,
)
