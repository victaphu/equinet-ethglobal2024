'use client'

import abi from '@/abi/ContractAbi.json'
import { IDKitWidget, ISuccessResult, useIDKit } from '@worldcoin/idkit'
import { useEffect, useState } from 'react'
import Header from '@/components/header/header'
import HorseCard from '@/components/horse/HorseCard'
import { Grid } from '@mui/material'
import horses from '@/lib/horses.json'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import useHorseFilters from '@/hooks/useHorseFilter'
import { config } from '@/lib/config'
import { IProvider } from '@web3auth/base'
import Web3 from "web3";

const webAuth = config;

export default function Home() {
	const { setOpen } = useIDKit()
	const [done, setDone] = useState(false)
	const [browser, setBrowser] = useState(false)
	const { filteredHorses, applyFilters, resetFilters } = useHorseFilters(horses);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

	const [address, setAddress] = useState("");

	const submitTx = async (proof: ISuccessResult) => {

	}

	const updateProviderAndAddress = async (web3Auth: any) => {
		setProvider(webAuth.provider);

		if (webAuth.connected) {
			setLoggedIn(true);
			const web3 = new Web3(webAuth.provider as any);
			setAddress((await web3.eth.getAccounts())[0]);
		}
	}

	const logout = () => {
    setLoggedIn(false);
    setProvider(null);
    setAddress("");
  }
  
  const handleDisconnect = () => {
    webAuth.logout().then(logout)
  }


	useEffect(() => {
		setBrowser(true);
		const init = async () => {
			try {
				await webAuth.initModal();
				await updateProviderAndAddress(webAuth);
			} catch (error) {
				console.error(error);
			}
		};

		init();
	}, [])

	const login = async () => {
    const web3authProvider = await webAuth.connect();
    await updateProviderAndAddress(webAuth);
  };

	if (!browser) {
		return <></>
	}

	return (
		<ThemeProvider theme={theme}>

			<div className='App'>
				<Header onConnect={login} address={address} disconnect={handleDisconnect}/>
				{/* <ConnectKitButton/> */}
				{/* <Filters onChange={applyFilters} onReset={resetFilters} /> */}

				<Grid container justifyContent="center" spacing={2}>
					{filteredHorses.map((horse: any) => (
						<Grid item xs={12} sm={6} md={4} key={horse.id} display="flex" justifyContent="center">
							<HorseCard horse={horse} />
						</Grid>
					))}
				</Grid>

				{/* {account.isConnected && (<>
					<IDKitWidget
						app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
						action={process.env.NEXT_PUBLIC_ACTION as string}
						signal={account.address}
						onSuccess={submitTx}
						autoClose
					/>
				</>)} */}
			</div>
		</ThemeProvider>
	)
}