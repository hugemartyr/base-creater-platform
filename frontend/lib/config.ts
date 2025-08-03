import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, polygon, optimism, arbitrum, base, baseSepolia } from 'wagmi/chains'

import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '99f6f09a6971adf57ed5988d832b8df9',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [baseSepolia.id]: http("https://base-sepolia.g.alchemy.com/v2/ZM8ACMJB67C2IXKKBF8URFUNSY"),
  },
});