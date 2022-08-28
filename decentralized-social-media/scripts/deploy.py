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
import json
from dotenv import load_dotenv
from brownie import Wei, accounts, SocialMedia, chain

load_dotenv()


def main():
    txn = SocialMedia.deploy((0.001), {"from": accounts[0]})
    store_add_abi(txn)

def store_add_abi(txn):
    jsonify_abi = json.loads(txn.abi)
    _dict = {}
    _dict[f"{chain.id}": txn.address]
    jsonify_address = json.loads(_dict)
    with open("../../decentralized-social-media-client/constants/abi.json", "w") as abi:
        json.dump(jsonify_abi, abi)
    with open("../../decentralized-social-media-client/constants/addresses.json", "w") as add:
        json.dump(jsonify_address, add)
