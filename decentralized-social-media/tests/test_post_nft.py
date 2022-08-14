# write tests for PostNft contract here

"""
use the SocialMedia contract to call PostNft functions
just check if the constructor has initialized counter value correctly
as that is the only public function
"""
import os
import pytest
from brownie import Wei, accounts, SocialMedia

@pytest.fixture
def social_media():
    return SocialMedia.deploy(0.001, {'from': accounts[0]})

def test_Mint_NFT(social_media):
    pass
    