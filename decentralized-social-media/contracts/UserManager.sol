// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";

/* errors */

error UserManager__ZeroBalance();
error UserManager__WithdrawFailed();
error UserManager__UsernameTooShort();
error UserManager__UsernameTooLong();
error UserManager__AboutMeTooLong();
error UserManager__UserDoesNotExist();
error UserManager__InvalidFollowRequest();

contract UserManager {
	/* structs */

	struct User {
		string username;
		string aboutMe;
		uint256 followerCount;
		uint256 followingCount;
		bool exists;
		uint256 _balance;
	}

	/* state variables */

	uint256 internal s_userCount;
	mapping(address => User) internal s_users;
	mapping(address => mapping(address => bool)) internal s_follows;

	/* events */

	event UserCreated(address indexed user, string username, string aboutMe);
	event UsernameUpdated(address indexed user, string username);
	event AboutMeUpdated(address indexed user, string aboutMe);
	event Followed(address indexed from, address indexed to);
	event Unfollowed(address indexed from, address indexed to);
	event FollowerRemoved(address indexed from, address indexed to);
	event Withdrawn(address indexed user, uint256 amount);

	/* constructors */

	constructor() {
		s_userCount = 0;
	}

	/* modifiers */

	modifier userExists(address user) {
		if(!s_users[user].exists) 
			revert UserManager__UserDoesNotExist();	
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
				exists: true,
				_balance: 0
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

	function follow(address user) public userExists(msg.sender) userExists(user) {
		if(s_follows[msg.sender][user] || msg.sender == user) 
			revert UserManager__InvalidFollowRequest();
		s_follows[msg.sender][user] = true;
		s_users[msg.sender].followingCount += 1;
		s_users[user].followerCount += 1;
		emit Followed(msg.sender, user);
	}

	function unfollow(address user) public userExists(msg.sender) userExists(user) {
		if(!s_follows[msg.sender][user]) 
			revert UserManager__InvalidFollowRequest();
		delete s_follows[msg.sender][user];
		s_users[msg.sender].followingCount -= 1;
		s_users[user].followerCount -= 1;
		emit Unfollowed(msg.sender, user);
	}

	function removeFollower(address user) public userExists(msg.sender) userExists(user) {
		if(!s_follows[user][msg.sender]) 
			revert UserManager__InvalidFollowRequest();
		delete s_follows[user][msg.sender];
		s_users[msg.sender].followerCount -= 1;
		s_users[user].followingCount -= 1;
		emit FollowerRemoved(user, msg.sender);
	}

	function withdraw() public payable userExists(msg.sender) {
		uint256 _balance = s_users[msg.sender]._balance;
		s_users[msg.sender]._balance = 0;
		if(_balance <= 0) 
			revert UserManager__ZeroBalance();
		(bool success, ) = payable(msg.sender).call{value: _balance}("");
		if(!success) 
			revert UserManager__WithdrawFailed();
		emit Withdrawn(msg.sender, _balance);
	}

	/* view functions */

	function getUsername(address user) public view returns (string memory) {
		return s_users[user].username;
	}

	function getAboutMe(address user) public view returns (string memory) {
		return s_users[user].aboutMe;
	}

	function getFollowerCount(address user) public view returns (uint256) {
		return s_users[user].followerCount;
	}

	function getFollowingCount(address user) public view returns (uint256) {
		return s_users[user].followingCount;
	}

	function getUserExists(address user) public view returns (bool) {
		return s_users[user].exists;
	}

	function getBalance() public view returns (uint256) {
		return s_users[msg.sender]._balance;
	}

	function getHasFollowed(address from, address to) public view returns (bool) {
		return s_follows[from][to];
	}

	function getUserCount() public view returns (uint256) {
		return s_userCount;
	}
}