
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";

import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { baseSepolia } from '@wagmi/core/chains'

const chains = [baseSepolia];

const clientId = process.env.NEXT_PUBLIC_WEBAUTH_CLIENT_ID!

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x" + chains[0].id.toString(16),
  rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
  displayName: chains[0].name,
  tickerName: chains[0].nativeCurrency?.name,
  ticker: chains[0].nativeCurrency?.symbol,
  blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string,
};


const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig }
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider,
});

export default web3auth