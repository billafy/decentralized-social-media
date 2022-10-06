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
import shutil

load_dotenv()

def clear_development_deployments():
    if chain.id in [1337]:
        deployments_path = "./build/deployments"
        for file in os.listdir(deployments_path):
            try:
                os.remove(f"{deployments_path}/{file}")
            except:
                shutil.rmtree(f"{deployments_path}/{file}")


def store_add_abi(social_media):
    addresses = json.loads(
        open(
            "../decentralized-social-media-client/constants/addresses.json", "r"
        ).read()
    )
    if not addresses:
        addresses = {}
    addresses[str(chain.id)] = social_media.address
    with open("../decentralized-social-media-client/constants/abi.json", "w") as abi:
        json.dump(social_media.abi, abi, indent=3)
    with open(
        "../decentralized-social-media-client/constants/addresses.json", "w"
    ) as add:
        json.dump(addresses, add, indent=3)


def main():
    clear_development_deployments()
    SocialMedia.deploy((0.001), {"from": accounts[0]})
    social_media = SocialMedia[-1]
    store_add_abi(social_media)
