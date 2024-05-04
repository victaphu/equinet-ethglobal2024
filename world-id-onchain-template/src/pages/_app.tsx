'use client'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiProvider } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/lib/config'
import { useEffect, useState } from 'react'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	const [browser, setBrowser] = useState(false)

	useEffect(() => {
		setBrowser(true);
	}, [])

	if (!browser) {
		return <></>
	}

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider>
					<Component {...pageProps} />
				</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
