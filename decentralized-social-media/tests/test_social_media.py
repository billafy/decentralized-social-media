# write tests for SocialMedia contract here

"""
skip for now as it is not complete yet
"""

import os
import pytest
from brownie import Wei, accounts, SocialMedia


@pytest.fixture
def social_media():
    return SocialMedia.deploy(Wei("0.001 ether"), {"from": accounts[0]})


def test_post_count(social_media):
    prev_post_count = social_media.getPostCount()
    social_media.createUser()
    social_media.createPost("xd")
    new_post_count = social_media.getPostCount()
    assert prev_post_count == new_post_count - 1


def test_delete_post(social_media):
    social_media.createUser()
    txn = social_media.createPost("xd")
    txn.wait(1)
    post_count = txn.return_value
    social_media.deletePost(post_count)
    exists = social_media.getPostExists(post_count)
    assert not exists


def test_mint_post(social_media):
    social_media.createUser()
    txn = social_media.createPost("xd")
    txn.wait(1)
    post_count = txn.return_value
    isminted = social_media.getIsMinted(0)
    social_media.mintPost(post_count, {"value": Wei("0.001 ether")})
    new_isminted = social_media.getIsMinted(0)
    assert bool(isminted) != bool(new_isminted)


def test_inc_like(social_media):
    social_media.createUser()
    social_media.createPost("xd")
    prev_like_count = social_media.getLikes(0)
    social_media.likePost(0)
    new_like_count = social_media.getLikes(0)
    assert prev_like_count == new_like_count - 1


def test_inc_dislike(social_media):
    social_media.createUser()
    social_media.createPost("xd")
    prev_like_count = social_media.getLikes(0)
    social_media.likePost(0)
    social_media.dislikePost(0)
    new_like_count = social_media.getLikes(0)
    assert prev_like_count == new_like_count
