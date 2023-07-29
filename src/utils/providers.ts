import { ethers } from 'ethers'
import { ALCHEMY_ID, ALCHEMY_ID_MAINNET } from '../config'
import CachedStaticJsonRpcProvider from './CachedStaticJsonRpcProvider'

export const alchemyProvider = new ethers.providers.AlchemyProvider(10, ALCHEMY_ID)

export const MAINNET_NETWORK_CONFIG = {
  name: 'Mainnet',
  shortName: 'Mainnet',
  chainId: 1,
  network: 'ethereum',
  walletRpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID_MAINNET}`,
  readRpcUrls: [`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID_MAINNET}`],
  blockExplorerUrl: 'https://etherscan.io/',
  iconUrls: [],
}

export const alchemyProviderMainnet = new CachedStaticJsonRpcProvider(
  MAINNET_NETWORK_CONFIG.readRpcUrls,
  MAINNET_NETWORK_CONFIG.chainId,
)
