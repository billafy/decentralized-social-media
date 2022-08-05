// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721Full.sol';

/* errors */

error PostNft__TokenIDDoesNotExist();

contract PostNft is ERC721Full {

	/* state variables */

	uint256 private s_tokenCounter;

	/* events */

	event Minted(uint256 indexed tokenId);

	/* constructors */

	constructor() ERC721Full("Post", "PST") public {
		s_tokenCounter = 0;
	}

	/* main functions */

	function mintPostNft(address creator, string memory tokenURI) public {
		_safeMint(creator, s_tokenCounter);
		_setTokenURI(s_tokenCounter, tokenURI);
		emit Minted(s_tokenCounter);
		s_tokenCounter = s_tokenCounter + 1;
	}

	/* view functions */

	function tokenURI(uint256 tokenId) public override view returns (string memory) {
		if(!_exists(tokenid)) 
			revert PostNft__TokenIDDoesNotExist();
		return TOKEN_URI;
	}

	function getTokenCounter() public view returns (uint256) {
		return s_tokenCounter;
	}
}