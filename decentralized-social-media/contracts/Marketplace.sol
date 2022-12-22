// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import './PostNft.sol';
import "../interfaces/IERC721.sol";

/* errors */

error Marketplace__InvalidTokenID();
error Marketplace__InsufficientFee();
error Marketplace__BidCannotBeZero();
error Marketplace__AlreadyBidded();
error Marketplace__OwnerCannotBid();
error Marketplace__OnlyOwnerCanAccept();
error Marketplace__ZeroBalance();
error Marketplace__WithdrawFailed();
error Marketplace__BidNotAccepted();

contract Marketplace is PostNft {
	/* structs */

	struct Bid {
		uint256 amount;
		bool accepted;
	}

	/* state variables */

	uint256 private immutable i_mintFee;
	mapping(uint256 => mapping(address => Bid)) private s_bids;
	mapping(address => uint256) s_balances;
	mapping(uint256 => address[]) private s_bidders;
	mapping(uint256 => address) private s_creators;

	/* events */

	event PostMinted(uint256 indexed tokenId, address owner);
	event BidSubmitted(uint256 indexed tokenId, address bidder, uint256 amount);
	event BidAccepted(uint256 indexed tokenId, address bidder);
	event Withdrawn(address indexed user, uint256 amount);
	event NftTransferred(uint256 indexed tokenId, address from, address to, uint256 amount);

	/* modifier */

	modifier nftExists(uint256 tokenId) {
		if(tokenId >= getTokenCounter()) 
			revert Marketplace__InvalidTokenID();
		_;
	}

	modifier isNftOwner(uint256 tokenId) {
		if(msg.sender != ownerOf(tokenId)) 
			revert Marketplace__OwnerCannotBid();
		_;
	}

	modifier isNotNftOwner(uint256 tokenId) {
		if(msg.sender == ownerOf(tokenId)) 
			revert Marketplace__OnlyOwnerCanAccept();
		_;
	}

	/* constructors */

	constructor(uint256 mintFee) {
		i_mintFee = mintFee;
	}

	/* main functions */

	function mintPost(string memory postURI) public payable {
		if(msg.value != i_mintFee) 
			revert Marketplace__InsufficientFee();
		uint256 tokenId = mintNft(msg.sender, postURI);
		s_creators[tokenId] = msg.sender;
		emit PostMinted(tokenId, msg.sender);
	}

	function submitBid(uint256 tokenId, uint256 amount) public nftExists(tokenId) isNotNftOwner(tokenId) {
		if(amount <= 0) 
			revert Marketplace__BidCannotBeZero();
		if(s_bids[tokenId][msg.sender].amount != 0) 
			revert Marketplace__AlreadyBidded();
		s_bids[tokenId][msg.sender] = Bid(amount, false);
		s_bidders[tokenId].push(msg.sender);
		emit BidSubmitted(tokenId, msg.sender, amount);
	}

	function acceptBid(uint256 tokenId, address bidder) public nftExists(tokenId) isNftOwner(tokenId) {
		if(s_bids[tokenId][bidder].amount == 0) 
			revert Marketplace__BidCannotBeZero();
		s_bids[tokenId][bidder].accepted = true;
		emit BidAccepted(tokenId, bidder);
	}

	function makePayment(uint256 tokenId) public payable isNotNftOwner(tokenId) {
		Bid memory bid = s_bids[tokenId][msg.sender];
		if(bid.amount == 0) 
			revert Marketplace__BidCannotBeZero();
		if(msg.value != bid.amount) 
			revert Marketplace__InsufficientFee();
		if(!bid.accepted) 
			revert Marketplace__BidNotAccepted();
		for(uint256 i = 0; i < s_bidders[tokenId].length; ++i) 
			s_bids[tokenId][s_bidders[tokenId][i]] = Bid(0, false);
		s_bidders[tokenId] = new address[](0);
		address from = ownerOf(tokenId);
		transferNft(from, msg.sender, tokenId);
		if(s_creators[tokenId] == from) 
			s_balances[from] += bid.amount;
		else {
			s_balances[s_creators[tokenId]] += bid.amount * 50000000 / 1000000000;
			s_balances[from] += bid.amount * 950000000 / 1000000000;
		}
		emit NftTransferred(tokenId, from, msg.sender, bid.amount);
	}

	function withdraw() public payable {
		uint256 _balance = s_balances[msg.sender];
		s_balances[msg.sender] = 0;
		if(_balance <= 0) 
			revert Marketplace__ZeroBalance();
		(bool success, ) = payable(msg.sender).call{value: _balance}("");
		if(!success) 
			revert Marketplace__WithdrawFailed();
		emit Withdrawn(msg.sender, _balance);
	}

	/* view functions */

	function getNftOwner(uint256 tokenId) public view returns (address) {
		return ownerOf(tokenId);
	}

	function getURI(uint256 tokenId) public view returns (string memory) {
		return tokenURI(tokenId);
	}

	function getMintFee() public view returns (uint256) {
		return i_mintFee;
	}

	function getCreator(uint256 tokenId) public view returns(address) {
		return s_creators[tokenId];
	}

	function getBidAmount(uint256 tokenId, address bidder) public view returns (uint256) {
		return s_bids[tokenId][bidder].amount;
	}

	function getBidAccepted(uint256 tokenId, address bidder) public view returns (bool) {
		return s_bids[tokenId][bidder].accepted;
	}

	function getBidder(uint256 tokenId, uint256 i) public view returns (address) {
		return s_bidders[tokenId][i];
	}

	function getNumberOfBidders(uint256 tokenId) public view returns (uint256) {
		return s_bidders[tokenId].length;
	}

	function getBalance() public view returns (uint256) {
		return s_balances[msg.sender];
	}
}