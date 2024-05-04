import { NextResponse } from "next/server";
import Web3 from "web3";
import { decodeAbiParameters, parseAbiParameters } from 'viem'

const web3 = new Web3(process.env.PROVIDER_API!);
const contractAddress = process.env.ATTESTATION_CONTRACT_ADDRESS!;
const abi = [{ "type": "constructor", "inputs": [{ "name": "_worldId", "type": "address", "internalType": "contract IWorldID" }, { "name": "_appId", "type": "string", "internalType": "string" }], "stateMutability": "nonpayable" }, { "type": "function", "name": "attestations", "inputs": [{ "name": "", "type": "address", "internalType": "address" }, { "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, { "type": "function", "name": "nullifierExists", "inputs": [{ "name": "nullifierHash", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, { "type": "function", "name": "verifyAndAttest", "inputs": [{ "name": "signal", "type": "address", "internalType": "address" }, { "name": "root", "type": "uint256", "internalType": "uint256" }, { "name": "nullifierHash", "type": "uint256", "internalType": "uint256" }, { "name": "attestation", "type": "uint256", "internalType": "uint256" }, { "name": "_actionId", "type": "string", "internalType": "string" }, { "name": "proof", "type": "uint256[8]", "internalType": "uint256[8]" }], "outputs": [], "stateMutability": "nonpayable" }, { "type": "event", "name": "Attested", "inputs": [{ "name": "account", "type": "address", "indexed": false, "internalType": "address" }, { "name": "attestation", "type": "uint256", "indexed": false, "internalType": "uint256" }], "anonymous": false }, { "type": "event", "name": "Verified", "inputs": [{ "name": "nullifierHash", "type": "uint256", "indexed": false, "internalType": "uint256" }], "anonymous": false }, { "type": "error", "name": "DuplicateAttestation", "inputs": [{ "name": "acc", "type": "address", "internalType": "address" }, { "name": "attestation", "type": "uint256", "internalType": "uint256" }] }, { "type": "error", "name": "DuplicateNullifier", "inputs": [{ "name": "nullifierHash", "type": "uint256", "internalType": "uint256" }] }];
const contract = new web3.eth.Contract(abi, contractAddress);

async function verifyAndAttest(signal: string, attestation: number, actionId: string, proof: any) {
  try {
    // Your account's private key
    const privateKey = process.env.ETH_PRIVATE_KEY;
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    web3.eth.accounts.wallet.add(account);

    const currentPrices = await web3.eth.getGasPrice();
    const feeData = await web3.eth.getFeeHistory(1, 'latest', [25, 50, 75]);

    const maxPriorityFeePerGas = web3.utils.toWei('2', 'gwei');  // Example: 2 Gwei, adjust based on network conditions
    const maxFeePerGas = web3.utils.toWei('100', 'gwei');  // Example: 100 Gwei, adjust based on network conditions


    // Prepare the transaction
    const tx = {
      from: account.address,
      to: contractAddress,
      gas: 200000,  // Adjust gas limit as necessary
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      maxFeePerGas: maxFeePerGas,
      data: contract.methods.verifyAndAttest(
        signal!,
        BigInt(proof!.merkle_root),
        BigInt(proof!.nullifier_hash),
        attestation,
        actionId,
        decodeAbiParameters(
          parseAbiParameters('uint256[8]'),
          proof!.proof as `0x${string}`
        )[0]
      ).encodeABI()
    };

    // Sign and send the transaction
    const signedTx = await account.signTransaction(tx);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('Transaction receipt:', receipt);
    return receipt;
  } catch (error) {
    console.error('Error calling verifyAndAttest:', error);
    return error;
  }
}

export async function POST(request: Request) {


  // 1. retrieve the proofs along with the key (e.g. age, criminal records, location)
  // 2. verify the proof using worldcoin api
  // 3. attest, including the public key 
  // try {
  // 	await writeContractAsync({
  // 		address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
  // 		account: account.address!,
  // 		abi,
  // 		functionName: 'verifyAndExecute',
  // 		args: [
  // 			account.address!,
  // 			BigInt(proof!.merkle_root),
  // 			BigInt(proof!.nullifier_hash),
  // 			decodeAbiParameters(
  // 				parseAbiParameters('uint256[8]'),
  // 				proof!.proof as `0x${string}`
  // 			)[0],
  // 		],
  // 	})
  // 	setDone(true)
  // } catch (error) { throw new Error((error as BaseError).shortMessage) }

  const { signal, proof, actionId, attestation} = await request.json();

  const receipt = await verifyAndAttest(signal, attestation, actionId, proof) as any
  const txnHash = receipt.transactionHash || receipt
  return NextResponse.json({ message: "Hello World", result: txnHash }, { status: 200 });
}

export async function GET(request: Request) {
  // Do whatever you want
  return NextResponse.json({ message: "Attest API - Proofs must be submitted" }, { status: 200 });
}