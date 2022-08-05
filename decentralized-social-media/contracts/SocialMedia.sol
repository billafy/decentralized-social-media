// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./UserManager.sol";
import "../interfaces/IERC721.sol";

/* errors */

contract SocialMedia is UserManager {
	/* structs */

	/* state variables */

	IERC721 private immutable i_postNft;

	/* events */

	/* constructors */

	constructor(address postNftAddress) public {
		i_postNft = IERC721(postNftAddress);
	}

	/* modifiers */

	/* main functions */

	/* view functions */

}