'use client'

import abi from '@/abi/ContractAbi.json'
import { ConnectKitButton } from 'connectkit'
import { IDKitWidget, ISuccessResult, useIDKit } from '@worldcoin/idkit'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, type BaseError, useDisconnect } from 'wagmi'
import { decodeAbiParameters, parseAbiParameters } from 'viem'
import { useEffect, useState } from 'react'
import Header from '@/components/header/header'
import HorseCard from '@/components/horse/HorseCard'
import { Grid } from '@mui/material'
import horses from '@/lib/horses.json'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import useHorseFilters from '@/hooks/useHorseFilter'
import Filters from '@/components/filter/filter'

export default function Home() {
	const account = useAccount()
	const disconnect = useDisconnect()
	const { setOpen } = useIDKit()
	const [done, setDone] = useState(false)
	const { data: hash, isPending, error, writeContractAsync } = useWriteContract()
	const [browser, setBrowser] = useState(false)
	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		})
	const { filteredHorses, applyFilters, resetFilters } = useHorseFilters(horses);

	console.log(account.address, account.isConnected);

	const submitTx = async (proof: ISuccessResult) => {
		try {
			await writeContractAsync({
				address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
				account: account.address!,
				abi,
				functionName: 'verifyAndExecute',
				args: [
					account.address!,
					BigInt(proof!.merkle_root),
					BigInt(proof!.nullifier_hash),
					decodeAbiParameters(
						parseAbiParameters('uint256[8]'),
						proof!.proof as `0x${string}`
					)[0],
				],
			})
			setDone(true)
		} catch (error) { throw new Error((error as BaseError).shortMessage) }
	}
	useEffect(() => {
		setBrowser(true)
	}, [])

	if (!browser) {
		return <></>
	}

	return (
		<ThemeProvider theme={theme}>

			<div className='App'>
				<Header />
				{/* <ConnectKitButton/> */}
				{/* <Filters onChange={applyFilters} onReset={resetFilters} /> */}

				<Grid container justifyContent="center" spacing={2}>
					{filteredHorses.map((horse: any) => (
						<Grid item xs={12} sm={6} md={4} key={horse.id} display="flex" justifyContent="center">
							<HorseCard horse={horse} />
						</Grid>
					))}
				</Grid>

				{account.isConnected && (<>
					<IDKitWidget
						app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
						action={process.env.NEXT_PUBLIC_ACTION as string}
						signal={account.address}
						onSuccess={submitTx}
						autoClose
					/>

					{!done && <button onClick={() => setOpen(true)}>{!hash && (isPending ? "Pending, please check your wallet..." : "Verify and Execute Transaction")}</button>}

					{hash && <p>Transaction Hash: {hash}</p>}
					{isConfirming && <p>Waiting for confirmation...</p>}
					{isConfirmed && <p>Transaction confirmed.</p>}
					{error && <p>Error: {(error as BaseError).message}</p>}
				</>)}
			</div>
		</ThemeProvider>
	)
}