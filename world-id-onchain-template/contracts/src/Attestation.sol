// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { ByteHasher } from './helpers/ByteHasher.sol';
import { IWorldID } from './interfaces/IWorldID.sol';

/// @dev Attestation used by attesters against wallet address
contract Attestation {
	using ByteHasher for bytes;

	///////////////////////////////////////////////////////////////////////////////
	///                                  ERRORS                                ///
	//////////////////////////////////////////////////////////////////////////////

	/// @notice Thrown when attestation already applied
	error DuplicateAttestation(address acc, uint256 attestation);

	/// @notice Thrown when attempting to reuse a nullifier
	error DuplicateNullifier(uint256 nullifierHash);

	/// @dev The World ID instance that will be used for verifying proofs
	IWorldID internal immutable worldId;

	/// @dev The contract's external nullifier hash
	uint256 internal immutable externalNullifier;

	/// @dev The World ID group ID (always 1)
	uint256 internal immutable groupId = 1;

	/// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
	mapping(uint256 => bool) internal nullifierHashes;

	/// @dev Attestations made for specific address; number represents various attestations that are supported
	mapping(address => mapping(uint256 => bool)) public attestations;

	/// @param nullifierHash The nullifier hash for the verified proof
	/// @dev A placeholder event that is emitted when a user successfully verifies with World ID
	event Verified(uint256 nullifierHash);


	/// @param account the address that the attestation applies to
	/// @param attestation the attestation key made
	/// @dev Event for successful attestation
	event Attested(address account, uint256 attestation);

	/// @param _worldId The WorldID router that will verify the proofs
	/// @param _appId The World ID app ID
	constructor(IWorldID _worldId, string memory _appId) {
		worldId = _worldId;
		externalNullifier = abi.encodePacked(_appId).hashToField();
	}

	function nullifierExists(uint256 nullifierHash) public view returns (bool) {
		return nullifierHashes[nullifierHash];
	}

	function findAttestation(address signal, uint256 attest) public view returns (bool) {
		return attestations[signal][attest];
	}

	/// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
	/// @param root The root of the Merkle tree (returned by the JS widget).
	/// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
	/// @param attestation The attestation id for user address (signal)
	/// @param _actionId Merge with appId to form the external nullifier
	/// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
	/// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
	function verifyAndAttest(address signal, uint256 root, uint256 nullifierHash, uint256 attestation, string memory _actionId, uint256[8] calldata proof) public {
		// First, we make sure this person hasn't done this before
		if (attestations[signal][attestation]) revert DuplicateAttestation(signal, attestation);
		if (nullifierHashes[nullifierHash]) revert DuplicateNullifier(nullifierHash);

		// uint256 externalNullifierLocal = abi.encodePacked(externalNullifier, _actionId).hashToField();

		// We now verify the provided proof is valid and the user is verified by World ID
		// worldId.verifyProof(
		// 	root,
		// 	groupId,
		// 	abi.encodePacked(signal).hashToField(),
		// 	nullifierHash,
		// 	externalNullifierLocal,
		// 	proof
		// );

		// We now record the user has done this, so they can't do it again (proof of uniqueness)
		nullifierHashes[nullifierHash] = true;
		attestations[signal][attestation] = true;

		// Finally, execute your logic here, for example issue a token, NFT, etc...
		// Make sure to emit some kind of event afterwards!

		emit Verified(nullifierHash);
	}
}
