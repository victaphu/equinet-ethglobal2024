import { createConfig, http } from 'wagmi'
import { type Chain } from 'viem'
import { fallback, injected, unstable_connector } from '@wagmi/core';
import { getDefaultConfig } from 'connectkit';
import Web3AuthConnectorInstance from '@/components/Web3AuthConnectorInstance';
import { walletConnect } from '@wagmi/connectors';
import { baseSepolia } from '@wagmi/core/chains'
// export const chain: Chain = {
//     id: 11155420,
//     name: "Optimism Sepolia Anvil Fork",
//     nativeCurrency: {
//         decimals: 18,
//         name: "Optimism Sepolia Anvil Fork Ether",
//         symbol: "SETH",
//     },
//     rpcUrls: {
//         default: { http: ["http://127.0.0.1:8545/"] },
//     },
//     testnet: true,
// };

export const chain: Chain = baseSepolia;

export const config = Web3AuthConnectorInstance;