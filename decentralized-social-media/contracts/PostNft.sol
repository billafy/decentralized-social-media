// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

/* errors */

contract PostNft is ERC721URIStorage {

	/* state variables */

	uint256 private s_tokenCounter;

	/* constructors */

	constructor() ERC721("Post", "PST") {
		s_tokenCounter = 1;
	}

	/* main functions */

	function mintNft(address creator, string memory tokenURI) internal returns (uint256) {
		uint256 tokenId = s_tokenCounter;
		s_tokenCounter += 1;
		_safeMint(creator, tokenId);
		_setTokenURI(tokenId, tokenURI);
		return tokenId;
	}

	function burnNft(uint256 tokenId) internal {
		_burn(tokenId);
	}

	function transferNft(address from, address to, uint256 tokenId) internal {
		_safeTransfer(from, to, tokenId, "");
	}

	/* view functions */

	function getTokenCounter() public view returns (uint256) {
		return s_tokenCounter;
	}
}