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

contract SocialMedia is UserManager {
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
	PostNft private immutable i_postNft;
	IERC721 private immutable i_postNftInterface;
	uint256 private s_postCount;
	mapping(uint256 => Post) private s_posts;
	mapping(uint256 => mapping(address => bool)) private s_likes;
	mapping(uint256 => mapping(address => uint256)) private s_bids;

	/* events */

	event PostCreated(uint256 indexed postId, address creator, string URI);
	event PostDeleted(uint256 indexed postId);
	event PostMinted(uint256 indexed postId, uint256 indexed tokenId);
	event PostLiked(uint256 indexed postId, address liker);
	event PostDisliked(uint256 indexed postId, address disliker);
	event PostBidded(uint256 indexed postId, address bidder, uint256 bidAmount);

	/* constructors */

	constructor(address postNftAddress, uint256 mintFee) {
		s_postCount = 0;
		i_postNft = PostNft(postNftAddress);
		i_postNftInterface = IERC721(postNftAddress);
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

	/* main functions */

	function createPost(string memory URI) public userExists(msg.sender) {
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
	}

	function deletePost(uint256 postId) public userExists(msg.sender) postExists(postId) isPostCreator(postId) {
		/*need to find a way to burn*/
		/*if(s_posts[postId].minted) 
			i_postNftInterface._burn(s_posts[postId].tokenId);*/
		delete s_posts[postId];
		emit PostDeleted(postId);
	}

	function mintPost(uint256 postId) public payable userExists(msg.sender) postExists(postId) isPostCreator(postId) {
		if(msg.value != i_mintFee) 
			revert SocialMedia__InsufficientMintFee();
		uint256 tokenId = i_postNft.mintNft(msg.sender, s_posts[postId].URI);
		if(i_postNft.getApproved(tokenId) != address(this)) 
			revert SocialMedia__NftNotApproved();
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

	function bid(uint256 postId, uint256 bidAmount) public userExists(msg.sender) postExists(postId) {
		if(s_posts[postId].creator == msg.sender) 
			revert SocialMedia__CreatorCannotBid();
		if(bidAmount <= 0) 
			revert SocialMedia__BidCannotBeZero();
		if(s_bids[postId][msg.sender] != 0) 
			revert SocialMedia__AlreadyBidded();
		s_bids[postId][msg.sender] = bidAmount;
		emit PostBidded(postId, msg.sender, bidAmount);
	}

	/*work to do*/
	/*function acceptBid(
		uint256 postId, 
		address bidder
	) public payable userExists(msg.sender) postExists(postId) isPostCreator(postId) {
		if(s_bids[postId][bidder] == 0) 
			revert SocialMedia__BidCannotBeZero();
		uint256 winningBid = s_bids[postId][bidder];
		s_bids[postId][bidder] = 0;
		s_users[msg.sender].balance += winningBid;
	}*/

	/* view functions */

	function getPost(uint256 postId) public view returns (Post memory) {
		return s_posts[postId];
	}

	function getPostCount() public view returns (uint256) {
		return s_postCount;
	}
}