import { useState, useEffect } from 'react';
import Web3 from 'web3';

// Set up web3 instance (adjust the provider URL)
const web3 = new Web3(process.env.NEXT_PUBLIC_PROVIDER_API!);
const abi = [{"type":"constructor","inputs":[{"name":"_worldId","type":"address","internalType":"contract IWorldID"},{"name":"_appId","type":"string","internalType":"string"}],"stateMutability":"nonpayable"},{"type":"function","name":"attestations","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"findAttestation","inputs":[{"name":"signal","type":"address","internalType":"address"},{"name":"attest","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"nullifierExists","inputs":[{"name":"nullifierHash","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"verifyAndAttest","inputs":[{"name":"signal","type":"address","internalType":"address"},{"name":"root","type":"uint256","internalType":"uint256"},{"name":"nullifierHash","type":"uint256","internalType":"uint256"},{"name":"attestation","type":"uint256","internalType":"uint256"},{"name":"_actionId","type":"string","internalType":"string"},{"name":"proof","type":"uint256[8]","internalType":"uint256[8]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"Attested","inputs":[{"name":"account","type":"address","indexed":false,"internalType":"address"},{"name":"attestation","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Verified","inputs":[{"name":"nullifierHash","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"DuplicateAttestation","inputs":[{"name":"acc","type":"address","internalType":"address"},{"name":"attestation","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"DuplicateNullifier","inputs":[{"name":"nullifierHash","type":"uint256","internalType":"uint256"}]}]
const contractAddress = process.env.NEXT_PUBLIC_ATTESTATION_CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(abi, contractAddress);

const useAttestation = (signal: string) => {
  const [attestationStatus, setAttestationStatus] = useState([false, false, false]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchAttestation = async () => {
    if (!signal || signal.length === 0) return; // Ensure signal and attestationNumber are provided
    console.log('fetching', signal)
    setIsLoading(true);
    async function fromContract(attestation: number) {
      try {
        const isAttested = await contract.methods.findAttestation(signal, +attestation).call();
        attestationStatus[attestation - 1] = isAttested as any;
        setAttestationStatus([...attestationStatus]);
        setError("");
      } catch (err) {
        console.error('Error fetching attestation:', err);
        setError('Failed to fetch attestation data');
        setAttestationStatus([...attestationStatus]);
      } finally {
        
      }
    }
    for (let i = 1; i < 4; ++i) {
      await fromContract(i);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAttestation();
  }, [signal]); // Dependency array to refetch when these values change

  return { attestationStatus, isLoading, error, fetchAttestation };
};

export default useAttestation;
