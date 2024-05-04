# Equinet Eth Global 2024 Hackathon - RWAs, World Coin and Compliant Security Token Offerings
For the EthGlobal Sydney 2024 Hackathon!  

## My Main Goal

- Combine EIP3643 standard (EIP 3643 - https://www.erc3643.org/) with worldcoin id
- EIP3643 has a set of contracts for identity verification which we can combine with combination of attestations and worldcoin nullifiers and proofs
- Combine Web3Auth with Worldcoin and attestations to make logins easier (account abstraction)

Security Tokens, Real World Assets and Worldcoin proof of person.  
Equinet aims to add Worldcoin as a potential Identity Provider in the EIP3643 Standard. We do this through the use of attestations. If a person is not validated   
on WorldCoin and not attested by a trusted, white-list attestation then they are considered non-compliant.  

## Inspiration for this project
In my day job I sell fractional ownership of thoroughbred horses; real horses tokenised and sold on the blockchain. Compliance, Identity, KYC, AML, these are things I deal with on a daily basis. We report to Racing Australia with ownership counts for every share of every horse we own; and we have to make sure that our processes are fully compliant with rules and regulations from ASIC.

Our ultimate goal is to make ownership of horse liquid; to the extent that we can start to trade them on secondary marketplaces; in DEXes, and as Real World Assets in tokenised liquidity and yield staking DeFi pools. The right horse can yield millions are year. These are real yield against a horse and can be used as RWA tokens deployed in DeFi pools, lending pools, with real yield and solid returns (a stallion can make hundreds of thousands of dollars every cover; where they get frisky with a broodmare).  

EIP3643 is a compliant way to issue permissioned security tokens; Worldcoin can be used as an identity provider to prove a person's existence. By combining these two there is a great opportunity to streamline the KYC process and allow users to start purchasing security tokens in a regulatory compliant way.

## What did I build?
- Added Worldcoin Attestations to EIP3643 by extending the ClaimIssuer to include claims from Worldcoin (https://github.com/victaphu/equinet-ethglobal2024/tree/main/ERC-3643/contracts/worldcoin)
- Created sample attestation app: note anyone can be Claim Issuer and trust is granted by the owners of the smart contract and tokens.
- Created sample marketplace that integrated with the Worldcoin attestations
- Integrate Account Abstraction and EIP4337 using Web3Auth to allow login using Google

## A bit about the architecture
- Core Attestation Contract is here; it uses worldcoin validation (but something broke so I comment out) https://github.com/victaphu/equinet-ethglobal2024/blob/main/world-id-onchain-template/contracts/src/Attestation.sol
- Attestation Logic is here, which uses the Worldcoin integrations (https://github.com/victaphu/equinet-ethglobal2024/blob/9b908dadea857744a2056607ea55cb600560ef1f/eth-global-attestation-hackathon/src/app/component/VerificationDialog.tsx#L16)
- I created incognito actions for each validation that was expected by each user. I used the simulator in Worldcoin to emulate the actions and an API layer that sent the actions to an attestation smart contract. Prevented the same nullifier from being accepted; would (in time) verify the proofs submitted


## Demo links and submissions
- List of Smart Contract calls on the BASE SEPOLIA blockchain (https://base-sepolia.blockscout.com/address/0x218b14B62cdcDb8611f76ccDf52F7a3D2e70b7af)
- Video Link (youtube)
- Website Links to the Attestation and the Sample Marketplace

## Next Steps
- Deploy EIP3643 standard with Worldcoin integration
- Build out the rest of the application and try to apply learnings to my day job
- Learn more about Worldcoin and Unlimit which has some great features I'd like to try