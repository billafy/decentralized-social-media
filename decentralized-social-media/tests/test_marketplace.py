import os
import pytest
from brownie import Wei, accounts, Marketplace, reverts

mint_fee = Wei("1 ether")
bid_amount = Wei("0.5 ether")
uri = 'ipfs://test'

''' utils '''

@pytest.fixture
def marketplace():
    return Marketplace.deploy(mint_fee, {"from": accounts[0]})

def mint_nft(marketplace): 
    txn = marketplace.mintPost(uri, {"from": accounts[0], "value": mint_fee})
    txn.wait(1)
    return txn.events[1]['tokenId']

''' tests '''

# constructor()

def test_mint_fee(marketplace): 
    assert marketplace.getMintFee() == mint_fee

# mintPost()

def test_mint_post_insufficient_fee(marketplace): 
    with pytest.raises(Exception): 
        marketplace.mintPost(uri, {"from": accounts[0]})

def test_mint_post_token_counter(marketplace): 
    mint_nft(marketplace)
    assert marketplace.getTokenCounter() == 2

def test_mint_post_event(marketplace): 
    txn = marketplace.mintPost(uri, {"from": accounts[0], "value": mint_fee})
    txn.wait(1)
    token_id, owner = txn.events[1]['tokenId'], txn.events[1]['owner']
    assert token_id == 1
    assert owner == accounts[0]

def test_mint_post_owner(marketplace): 
    token_id = mint_nft(marketplace)
    assert marketplace.ownerOf(token_id) == accounts[0]

def test_mint_post_creator(marketplace): 
    token_id = mint_nft(marketplace)
    assert marketplace.getCreator(token_id) == accounts[0]

def test_mint_post_uri(marketplace): 
    token_id = mint_nft(marketplace)
    assert marketplace.getURI(token_id) == uri

# submitBid()

def test_submit_bid_nft_not_exists(marketplace): 
    with pytest.raises(Exception): 
        marketplace.submitBid(1, bid_amount, {"from": accounts[0]})

def test_submit_bid_owner(marketplace): 
    token_id = mint_nft(marketplace)
    with pytest.raises(Exception): 
        marketplace.submitBid(token_id, bid_amount, {"from": accounts[0]})

def test_submit_bid_zero_amount(marketplace): 
    token_id = mint_nft(marketplace)
    with pytest.raises(Exception): 
        marketplace.submitBid(token_id, 0, {"from": accounts[1]})

def test_submit_bid_double_bid(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    with pytest.raises(Exception): 
        marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})

def test_submit_bid_amount(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    assert marketplace.getBidAmount(token_id, accounts[1]) == bid_amount

def test_submit_bid_not_accepted(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    assert marketplace.getBidAccepted(token_id, accounts[1]) == False

def test_submit_bid_list(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    assert marketplace.getBidder(token_id, 0) == accounts[1]

def test_submit_bid_event(marketplace): 
    token_id = mint_nft(marketplace)
    txn = marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    txn.wait(1)
    token_id, bidder, amount = txn.events[0]['tokenId'], txn.events[0]['bidder'], txn.events[0]['amount']
    assert token_id == 1
    assert bidder == accounts[1]
    assert amount == bid_amount

# acceptBid()

def test_accept_bid_invalid(marketplace): 
    token_id = mint_nft(marketplace)
    with pytest.raises(Exception): 
        marketplace.acceptBid(token_id, accounts[1], {"from": accounts[0]})

def test_accept_bid_accepted(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    marketplace.acceptBid(token_id, accounts[1], {"from": accounts[0]})
    assert marketplace.getBidAccepted(token_id, accounts[1]) == True

def test_accept_bid_event(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    txn = marketplace.acceptBid(token_id, accounts[1], {"from": accounts[0]})
    txn.wait(1)
    token_id, bidder = txn.events[-1]['tokenId'], txn.events[-1]['bidder']
    assert token_id == 1
    assert bidder == accounts[1]

def test_accept_bid_not_owner(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    with pytest.raises(Exception): 
        txn = marketplace.acceptBid(token_id, accounts[1], {"from": accounts[1]})

# makePayment()

def test_make_payment_invalid(marketplace): 
    token_id = mint_nft(marketplace)
    with pytest.raises(Exception): 
        marketplace.makePayment(token_id, {"from": accounts[1], "value": bid_amount})

def test_make_payment_insufficient_fee(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    marketplace.acceptBid(token_id, accounts[1], {"from": accounts[0]})
    with pytest.raises(Exception): 
        marketplace.makePayment(token_id, {"from": accounts[1], "value": Wei("0.4 ether")})

def test_make_payment_not_accepted(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    with pytest.raises(Exception): 
        marketplace.makePayment(token_id, {"from": accounts[1], "value": bid_amount})

def test_make_payment_reset_bid(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    marketplace.acceptBid(token_id, accounts[1], {"from": accounts[0]})
    marketplace.makePayment(token_id, {"from": accounts[1], "value": bid_amount})
    assert marketplace.getBidAmount(token_id, accounts[1]) == 0
    assert marketplace.getBidAccepted(token_id, accounts[1]) == False

def test_make_payment_clear_bids(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    marketplace.acceptBid(token_id, accounts[1], {"from": accounts[0]})
    marketplace.makePayment(token_id, {"from": accounts[1], "value": bid_amount})
    assert marketplace.getNumberOfBidders(token_id) == 0

def test_make_payment_transfer_nft(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    marketplace.acceptBid(token_id, accounts[1], {"from": accounts[0]})
    marketplace.makePayment(token_id, {"from": accounts[1], "value": bid_amount})
    assert marketplace.ownerOf(token_id) == accounts[1]

def test_make_payment_balance(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    marketplace.acceptBid(token_id, accounts[1], {"from": accounts[0]})
    marketplace.makePayment(token_id, {"from": accounts[1], "value": bid_amount})
    assert marketplace.getBalance({"from": accounts[0]}) == bid_amount

def test_make_payment_balance_second_transaction(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    marketplace.acceptBid(token_id, accounts[1], {"from": accounts[0]})
    marketplace.makePayment(token_id, {"from": accounts[1], "value": bid_amount})
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[2]})
    marketplace.acceptBid(token_id, accounts[2], {"from": accounts[1]})
    marketplace.makePayment(token_id, {"from": accounts[2], "value": bid_amount})
    assert marketplace.getBalance({"from": accounts[0]}) == bid_amount + bid_amount * 0.05
    assert marketplace.getBalance({"from": accounts[1]}) == bid_amount * 0.95

def test_make_payment_event(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    marketplace.acceptBid(token_id, accounts[1], {"from": accounts[0]})
    txn = marketplace.makePayment(token_id, {"from": accounts[1], "value": bid_amount})
    txn.wait(1)
    token_id, previous, current, amount = txn.events[-1]['tokenId'], txn.events[-1]['from'], txn.events[-1]['to'], txn.events[-1]['amount']
    assert token_id == 1
    assert previous == accounts[0]
    assert current == accounts[1]
    assert amount == bid_amount

# withdraw()

def test_withdraw_zero_balance(marketplace): 
    with pytest.raises(Exception): 
        marketplace.withdraw({"from": accounts[0]})

def test_withdraw_updated_balance(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    marketplace.acceptBid(token_id, accounts[1], {"from": accounts[0]})
    marketplace.makePayment(token_id, {"from": accounts[1], "value": bid_amount})
    marketplace.withdraw({"from": accounts[0]})
    assert marketplace.getBalance() == 0

def test_withdraw_updated_wallet_balance(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    marketplace.acceptBid(token_id, accounts[1], {"from": accounts[0]})
    marketplace.makePayment(token_id, {"from": accounts[1], "value": bid_amount})
    initial_wallet_balance = accounts[0].balance()
    txn = marketplace.withdraw({"from": accounts[0]})
    current_wallet_balance = accounts[0].balance()
    assert current_wallet_balance == initial_wallet_balance + bid_amount - (txn.gas_used * txn.gas_price)

def test_withdraw_event(marketplace): 
    token_id = mint_nft(marketplace)
    marketplace.submitBid(token_id, bid_amount, {"from": accounts[1]})
    marketplace.acceptBid(token_id, accounts[1], {"from": accounts[0]})
    marketplace.makePayment(token_id, {"from": accounts[1], "value": bid_amount})
    txn = marketplace.withdraw({"from": accounts[0]})
    txn.wait(1)
    user, amount =  txn.events[-1]['user'], txn.events[-1]['amount']
    assert user == accounts[0]
    assert amount == bid_amount