'use client'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
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
		<Component {...pageProps} />
	</>)
}
