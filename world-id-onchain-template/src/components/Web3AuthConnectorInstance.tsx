// Web3Auth Libraries
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Chain } from "wagmi/chains";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

const clientId = process.env.NEXT_PUBLIC_WEBAUTH_CLIENT_ID!
const web3AuthNetwork = WEB3AUTH_NETWORK.SAPPHIRE_DEVNET
export default function Web3AuthConnectorInstance(chains: Chain[]) {
  // Create Web3Auth Instance
  const name = "Equinet Ethglobal Hackathon";
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string,
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

  const web3AuthInstance = new Web3Auth({
    clientId,
    chainConfig,
    privateKeyProvider,
    uiConfig: {
      appName: name,
      loginMethodsOrder: ["google", "discord"],
      defaultLanguage: "en",
      modalZIndex: "2147483647",
      logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
      logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
      uxMode: "popup",
      mode: "light",
      loginGridCol: 2
    },
    web3AuthNetwork,
    enableLogging: true,
  });

  const metamaskAdapter = new MetamaskAdapter({
    clientId,
    web3AuthNetwork,
    chainConfig
  });

  const walletServicesPlugin = new WalletServicesPlugin({
    walletInitOptions: {
      whiteLabel: {
        showWidgetButton: true,
      }
    }
  });

  const adapter = new OpenloginAdapter({
    adapterSettings: {
      network: web3AuthNetwork,
      clientId,
      uxMode: 'popup',
      loginConfig: {
        google: {
          verifier: 'ethglobal-2024',
          typeOfLogin: "google",
          showOnModal: true,
          clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_GOOGLE_ID! // this should be the google client id. pls pass it
        },

        discord: {
          verifier: 'discord-ethglobal-2024',
          typeOfLogin: "discord",
          showOnModal: true,
          clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_DISCORD_ID! // this should be the google client id. pls pass it
        },
      },
    },
  });

  web3AuthInstance.addPlugin(walletServicesPlugin)
  web3AuthInstance.configureAdapter(metamaskAdapter)
  web3AuthInstance.configureAdapter(adapter)

  const modalConfig = {

    [WALLET_ADAPTERS.OPENLOGIN]: {
      label: "openlogin",
      loginMethods: {
        facebook: {
          // it will hide the facebook option from the Web3Auth modal.
          name: "facebook login",
          showOnModal: false,
        },
        github: {
          name: "github login",
          showOnModal: false,
        },
        reddit: {
          name: "reddit login",
          showOnModal: false,
        },
        twitter: {
          name: "reddit login",
          showOnModal: false,
        },
        line: {
          name: "reddit login",
          showOnModal: false,
        },
        kakao: {
          name: "reddit login",
          showOnModal: false,
        },
        linkedin: {
          name: "reddit login",
          showOnModal: false,
        },
        wechat: {
          name: "reddit login",
          showOnModal: false,
        },
        weibo: {
          name: "reddit login",
          showOnModal: false,
        },
        apple: {
          name: "reddit login",
          showOnModal: false,
        },
        farcaster: {
          name: "reddit login",
          showOnModal: false,
        },
        twitch: {
          name: "reddit login",
          showOnModal: false,
        },
        sms_passwordless: {
          name: "sms_passwordless",
          showOnModal: false,
        },
        email_passwordless: {
          name: "sms_passwordless",
          showOnModal: false,
        },
      },
      // setting it to false will hide all social login methods from modal.
      showOnModal: true,
    },
  }

  return Web3AuthConnector({
    web3AuthInstance,
    modalConfig,
  });
}