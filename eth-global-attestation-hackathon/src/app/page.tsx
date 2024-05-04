"use client"
import React, { useEffect, useState } from 'react';
import VerificationDialog from './component/VerificationDialog';
import AttestationCard from './component/AttestationCard';
import Header from './component/Header';
import web3auth from './lib/config';
import { IProvider } from '@web3auth/base';
import Web3 from 'web3';
import { ISuccessResult, useIDKit } from '@worldcoin/idkit';
import useAttestation from './lib/useAttestations';
import { baseSepolia } from 'viem/chains';


const ageIcon = '/data-verify.png';
const residencyIcon = '/residency-verify.png';
const criminalIcon = '/criminal-record-verify.png';

const attestations = [
  {
    title: "Age Verification",
    description: "Confirm your age to ensure you meet the minimum age requirement for our services.",
    icon: ageIcon,
    type: 'age',
    attetation: 1,
    action: 'eip3643-compliance-age'
  },
  {
    title: "Residency Verification",
    description: "Verify your residency to comply with regional legal requirements.",
    icon: residencyIcon,
    type: 'residency',
    attetation: 2,
    action: 'eip3643-compliance-location'
  },
  {
    title: "Criminal Record Verification",
    description: "Confirm your criminal record status to maintain a safe and secure environment for all users.",
    icon: criminalIcon,
    type: 'criminal',
    attetation: 3,
    action: 'eip3643-criminal-record'
  }
];

const cfg = web3auth

function App() {
  const [openDialog, setOpenDialog] = useState(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [address, setAddress] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const { setOpen } = useIDKit()

  const { attestationStatus, fetchAttestation } = useAttestation(address);


  async function sendTransaction(signal: string, attestation: number, actionId: string, proof: any) {
    const url = '/api/attest';
    const data = {
      signal: signal,
      attestation: attestation,
      actionId: actionId,
      proof: proof
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      console.log('Transaction successful:', responseData);

      fetchAttestation();

      return responseData;
    } catch (error) {
      console.error('Failed to send transaction:', error);
    }
  }

  const handleOpen = (type: any) => {
    setOpen(true);
    setOpenDialog(type);
  }
  const handleClose = (proof: ISuccessResult) => {
    console.log(address, proof)
    setOpen(false);
    setOpenDialog(null);
    const attest = attestations.find(e=>e.type === openDialog);
    sendTransaction(address, attest?.attetation || 1, attest?.action || 'eip3643-criminal-record' , proof);
  }
  const handleConnect = () => {
    console.log('connect')
    cfg.connect().then(updateAccounts)
  }

  const logout = () => {
    setLoggedIn(false);
    setProvider(null);
    setAddress("");
  }

  const handleDisconnect = () => {
    cfg.logout().then(logout)
  }

  const updateAccounts = async () => {
    const web3 = new Web3(web3auth.provider as any);
    setAddress((await web3.eth.getAccounts())[0]);
    setLoggedIn(true);

  }

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          updateAccounts();
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onConnect={handleConnect} loggedIn={loggedIn} address={address} disconnect={handleDisconnect} />
      <div className="grid place-items-center min-h-screen">
        <div className="space-y-4">
          {attestations.map((attestation, index) => (
            <AttestationCard key={index} {...attestation} onVerify={() => handleOpen(attestation.type)} verified={attestationStatus[index]} />
          ))}
        </div>
      </div>

      {/* Dialog Components */}
      <VerificationDialog
        title="Verify Age"
        open={openDialog === 'age'}
        signal={address}
        action={"eip3643-compliance-age"}
        onSuccess={handleClose}>
        Please confirm that you want to verify your age. This will allow us to ensure appropriate services are provided to you.
      </VerificationDialog>

      <VerificationDialog
        title="Verify Residency"
        open={openDialog === 'residency'}
        signal={address}
        action={"eip3643-compliance-location"}
        onSuccess={handleClose}>
        Please confirm your residency verification. This is required for compliance with regional regulations.
      </VerificationDialog>

      <VerificationDialog
        title="Verify Criminal Record"
        open={openDialog === 'criminal'}
        signal={address}
        action={"eip3643-criminal-record"}
        onSuccess={handleClose}>
        Confirm if you want to proceed with the criminal record verification. This will help maintain a safe and trustworthy environment for all users.
      </VerificationDialog>
    </div>
  );
}

export default App;
