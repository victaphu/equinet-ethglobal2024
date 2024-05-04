// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @dev Attestation used by attesters against wallet address
interface IWCAttestation {

	function findAttestation(address signal, uint256 attest) external view returns (bool);

	/// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
	/// @param root The root of the Merkle tree (returned by the JS widget).
	/// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
	/// @param attestation The attestation id for user address (signal)
	/// @param _actionId Merge with appId to form the external nullifier
	/// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
	/// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
	function verifyAndAttest(address signal, uint256 root, uint256 nullifierHash, uint256 attestation, string memory _actionId, uint256[8] calldata proof) external;
}
