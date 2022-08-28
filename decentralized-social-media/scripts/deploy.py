"""
This script will deploy all our contracts
"""

# things to do -
"""
1. deploy SocialMedia contract by passing the mint fee to it

Note: make sure you verify the contracts on etherscan while deploying
verifying makes our contracts easily traceable on etherscan
"""
import os
from dotenv import load_dotenv
from brownie import Wei, accounts, SocialMedia

load_dotenv()


def main():
    print(accounts[0])
    txn = SocialMedia.deploy((0.001), {"from": accounts[0]})
