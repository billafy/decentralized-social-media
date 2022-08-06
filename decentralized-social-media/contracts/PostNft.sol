// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

/* errors */

error PostNft__TokenIDDoesNotExist();

contract PostNft is ERC721URIStorage {

	/* state variables */

	uint256 private s_tokenCounter;

	/* events */

	event Minted(address indexed creator, uint256 indexed tokenId);

	/* constructors */

	constructor() ERC721("Post", "PST") public {
		s_tokenCounter = 0;
	}

	/* main functions */

	function mintPostNft(address creator, string memory tokenURI) public {
		_safeMint(creator, s_tokenCounter);
		_setTokenURI(s_tokenCounter, tokenURI);
		emit Minted(creator, s_tokenCounter);
		s_tokenCounter = s_tokenCounter + 1;
	}

	/* view functions */

	function getTokenCounter() public view returns (uint256) {
		return s_tokenCounter;
	}
}