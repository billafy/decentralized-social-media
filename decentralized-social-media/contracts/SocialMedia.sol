// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import './PostNft.sol';
import "./UserManager.sol";
import "../interfaces/IERC721.sol";

/* errors */

error SocialMedia__NotPostCreator();
error SocialMedia__NftNotApproved();
error SocialMedia__InvalidPostID();
error SocialMedia__InsufficientMintFee();
error SocialMedia__BidCannotBeZero();
error SocialMedia__AlreadyBidded();
error SocialMedia__CreatorCannotBid();
error SocialMedia__PostNotMinted();

contract SocialMedia is UserManager, PostNft {
	/* structs */

	struct Post {
		address creator;
		string URI;
		uint256 likes;
		bool minted;
		uint256 tokenId;
		bool exists;
	}

	/* state variables */

	uint256 private immutable i_mintFee;
	uint256 private s_postCount;
	mapping(uint256 => Post) private s_posts;
	mapping(uint256 => mapping(address => bool)) private s_likes;
	mapping(uint256 => mapping(uint256 => mapping(address => uint256))) private s_bids;

	/* events */

	event PostCreated(uint256 indexed postId, address creator, string URI);
	event PostDeleted(uint256 indexed postId);
	event PostMinted(uint256 indexed postId, uint256 indexed tokenId);
	event PostLiked(uint256 indexed postId, address liker);
	event PostDisliked(uint256 indexed postId, address disliker);
	event BidSubmitted(uint256 indexed postId, address bidder, uint256 bid);
	event BidAccepted(uint256 indexed postId, address bidder, uint256 winningBid);

	/* constructors */

	constructor(uint256 mintFee) {
		s_postCount = 0;
		i_mintFee = mintFee;
	}

	/* modifiers */

	modifier postExists(uint256 postId) {
		if(!s_posts[postId].exists) 
			revert SocialMedia__InvalidPostID();
		_;
	} 

	modifier isPostCreator(uint256 postId) {
		if(msg.sender != s_posts[postId].creator) 
			revert SocialMedia__NotPostCreator();
		_;
	}

	modifier isPostMinted(uint256 postId) {
		if(!s_posts[postId].minted) 
			revert SocialMedia__PostNotMinted();
		_;
	}

	/* main functions */

	function createPost(string memory URI) public userExists(msg.sender) returns (uint256) {
		Post memory post = Post({
			creator: msg.sender,
			URI: URI,
			likes: 0,
			minted: false,
			tokenId: 0,
			exists: true
		});
		s_posts[s_postCount] = post;
		emit PostCreated(s_postCount, msg.sender, URI);
		s_postCount += 1;
		return s_postCount;
	}

	function deletePost(uint256 postId) public userExists(msg.sender) postExists(postId) isPostCreator(postId) {
		if(s_posts[postId].minted) 
			burnNft(s_posts[postId].tokenId);
		delete s_posts[postId];
		emit PostDeleted(postId);
	}

	function mintPost(uint256 postId) public payable userExists(msg.sender) postExists(postId) isPostCreator(postId) {
		if(msg.value != i_mintFee) 
			revert SocialMedia__InsufficientMintFee();
		uint256 tokenId = mintNft(msg.sender, s_posts[postId].URI);
		s_posts[postId].minted = true;
		s_posts[postId].tokenId = tokenId;
		emit PostMinted(postId, tokenId);
	}

	function likePost(uint256 postId) public userExists(msg.sender) postExists(postId) {
		if(!s_likes[postId][msg.sender]) {
			s_likes[postId][msg.sender] = true;
			s_posts[postId].likes += 1;
			emit PostLiked(postId, msg.sender);
		}
	}

	function dislikePost(uint256 postId) public userExists(msg.sender) postExists(postId) {
		if(s_likes[postId][msg.sender]) {
			delete s_likes[postId][msg.sender];
			s_posts[postId].likes -= 1;
			emit PostDisliked(postId, msg.sender);
		}
	}

	function submitBid(
		uint256 postId, 
		uint256 bid
	) public userExists(msg.sender) postExists(postId) isPostMinted(postId) {
		if(s_posts[postId].creator == msg.sender) 
			revert SocialMedia__CreatorCannotBid();
		if(bid <= 0) 
			revert SocialMedia__BidCannotBeZero();
		uint256 tokenId = s_posts[postId].tokenId;
		if(s_bids[postId][tokenId][msg.sender] != 0) 
			revert SocialMedia__AlreadyBidded();
		s_bids[postId][tokenId][msg.sender] = bid;
		emit BidSubmitted(postId, msg.sender, bid);
	}

	function acceptBid(
		uint256 postId, 
		address bidder
	) public userExists(msg.sender) postExists(postId) isPostCreator(postId) isPostMinted(postId) {
		uint256 tokenId = s_posts[postId].tokenId;
		if(s_bids[postId][tokenId][bidder] == 0) 
			revert SocialMedia__BidCannotBeZero();
		uint256 winningBid = s_bids[postId][tokenId][bidder];
		s_posts[postId].minted = false;
		s_posts[postId].creator = bidder;
		s_posts[postId].tokenId = 0;
		s_bids[postId][tokenId][bidder] = 0;
		s_users[msg.sender]._balance += winningBid;
		burnNft(s_posts[postId].tokenId);
		emit BidAccepted(postId, bidder, winningBid);
	}

	/* view functions */

	function getCreator(uint256 postId) public view returns (address) {
		return s_posts[postId].creator;
	}

	function getURI(uint256 postId) public view returns (string memory) {
		return s_posts[postId].URI;
	}

	function getLikes(uint256 postId) public view returns (uint256) {
		return s_posts[postId].likes;
	}

	function getIsMinted(uint256 postId) public view returns (bool) {
		return s_posts[postId].minted;
	}

	function getTokenId(uint256 postId) public view returns (uint256) {
		return s_posts[postId].tokenId;
	}

	function getPostExists(uint256 postId) public view returns (bool) {
		return s_posts[postId].exists;
	}

	function getPostCount() public view returns (uint256) {
		return s_postCount;
	}

	function getMintFee() public view returns (uint256) {
		return i_mintFee;
	}

	function getHasLiked(uint256 postId, address liker) public view returns (bool) {
		return s_likes[postId][liker];
	}

	function getBid(uint256 postId, uint256 tokenId, address bidder) public view returns (uint256) {
		return s_bids[postId][tokenId][bidder];
	}
}