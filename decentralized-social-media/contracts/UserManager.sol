// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";

/* errors */

error UserManager__ZeroBalance();
error UserManager__WithdrawFailed();
error UserManager__UsernameTooShort();
error UserManager__UsernameTooLong();
error UserManager__AboutMeTooLong();

contract UserManager {
	/* structs */

	struct User {
		string username;
		string aboutMe;
		uint256 followerCount;
		uint256 followingCount;
		uint256 balance;
		bool exists;
	}

	/* state variables */

	uint256 internal s_userCount;
	mapping(address => User) internal s_users;
	mapping(address => mapping(address => bool)) internal s_follows;

	/* events */

	event UserCreated(address indexed userAddress, string username, string aboutMe);
	event UsernameUpdated(address indexed userAddress, string username);
	event AboutMeUpdated(address indexed userAddress, string aboutMe);
	event Followed(address indexed from, address indexed to);
	event Unfollowed(address indexed from, address indexed to);
	event FollowerRemoved(address indexed from, address indexed to);
	event Withdrawn(address indexed userAddress, uint256 amount);

	/* constructors */

	constructor() public {
		s_userCount = 0;
	}

	/* modifiers */

	modifier userExists(address userAddress) {
		if(s_users[userAddress].exists) 
			_;
	}

	/* main functions */

	function createUser() public {
		if(!s_users[msg.sender].exists) {
			string memory username = string(abi.encodePacked("User-", Strings.toString(s_userCount)));
			string memory aboutMe = string(abi.encodePacked("Hello, I am ", username));
			User memory user = User({
				username: username,
				aboutMe: aboutMe,
				followerCount: 0,
				followingCount: 0,
				balance: 0,
				exists: true
			});
			s_users[msg.sender] = user;
			s_userCount += 1;
			emit UserCreated(msg.sender, username, aboutMe);
		}
	}

	function updateUsername(string memory username) public userExists(msg.sender) {
		uint256 usernameLength = bytes(username).length;
		if(usernameLength < 6) 
			revert UserManager__UsernameTooShort();
		if(usernameLength > 18) 
			revert UserManager__UsernameTooLong();
		s_users[msg.sender].username = username;
		emit UsernameUpdated(msg.sender, username);
	}

	function updateAboutMe(string memory aboutMe) public userExists(msg.sender) {
		uint256 aboutMeLength = bytes(aboutMe).length;
		if(aboutMeLength > 256) 
			revert UserManager__AboutMeTooLong();
		s_users[msg.sender].aboutMe = aboutMe;		
		emit AboutMeUpdated(msg.sender, aboutMe);
	}

	function follow(address userAddress) public userExists(msg.sender) userExists(userAddress) {
		if(!s_follows[msg.sender][userAddress]) {
			s_follows[msg.sender][userAddress] = true;
			s_users[msg.sender].followingCount += 1;
			s_users[userAddress].followerCount += 1;
			emit Followed(msg.sender, userAddress);
		}
	}

	function unfollow(address userAddress) public userExists(msg.sender) userExists(userAddress) {
		if(s_follows[msg.sender][userAddress]) {
			s_follows[msg.sender][userAddress] = false;
			s_users[msg.sender].followingCount -= 1;
			s_users[userAddress].followerCount -= 1;
			emit Unfollowed(msg.sender, userAddress);
		}
	}

	function removeFollower(address userAddress) public userExists(msg.sender) userExists(userAddress) {
		if(s_follows[userAddress][msg.sender]) {
			s_follows[userAddress][msg.sender] = false;
			s_users[msg.sender].followerCount -= 1;
			s_users[userAddress].followingCount -= 1;
			emit FollowerRemoved(userAddress, msg.sender);
		}
	}

	function withdraw() public payable userExists(msg.sender) {
		uint256 balance = s_users[msg.sender].balance;
		s_users[msg.sender].balance = 0;
		if(balance <= 0) 
			revert UserManager__ZeroBalance();
		(bool success, ) = payable(msg.sender).call{value: balance}("");
		if(!success) 
			revert UserManager__WithdrawFailed();
		emit Withdrawn(msg.sender, balance);
	}

	/* view functions */

	function getUsername(address userAddress) public view returns (string memory) {
		return s_users[userAddress].username;
	}

	function getAboutMe(address userAddress) public view returns (string memory) {
		return s_users[userAddress].aboutMe;
	}

	function getFollowerCount(address userAddress) public view returns (uint256) {
		return s_users[userAddress].followerCount;
	}

	function getFollowingCount(address userAddress) public view returns (uint256) {
		return s_users[userAddress].followingCount;
	}

	function getBalance() public view returns (uint256) {
		return s_users[msg.sender].balance;
	}

	function getUserCount() public view returns (uint256) {
		return s_userCount;
	}
}