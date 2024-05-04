'use client'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
	const [browser, setBrowser] = useState(false)

	useEffect(() => {
		setBrowser(true);
	}, [])

	if (!browser) {
		return <></>
	}

	return (<>
		<Head>
			<title>Equinet EthGlobal 2024 Hackathon</title>
		</Head>
		<Component {...pageProps} />
	</>)
}
