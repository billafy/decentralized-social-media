import pytest
from brownie import accounts, PostNft

''' utils '''

@pytest.fixture
def post_nft():
    return PostNft.deploy({"from": accounts[0]})

''' tests '''

# constructor()

def test_get_token_counter(post_nft):
    token_counter = post_nft.getTokenCounter()
    assert token_counter == 1
