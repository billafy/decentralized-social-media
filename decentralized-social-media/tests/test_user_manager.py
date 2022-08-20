# write tests for UserManager contract here

"""
use the SocialMedia contract to call UserManager functions
as SocialMedia inherits UserManager
"""
import os
import pytest
import brownie
from brownie import Wei, accounts, SocialMedia


@pytest.fixture
def social_media():
    return SocialMedia.deploy(0.001, {"from": accounts[0]})


def test_constructor_user_count(social_media):
    user_count = social_media.getUserCount()
    assert user_count == 0


def test_create_user(social_media):
    social_media.createUser()
    user_exists = social_media.getUserExists(accounts[0])
    username = social_media.getUsername(accounts[0])
    about_me = social_media.getAboutMe(accounts[0])
    followerCount = social_media.getFollowerCount(accounts[0])
    followingCount = social_media.getFollowingCount(accounts[0])
    balance = social_media.getBalance()
    assert user_exists
    assert username == "User-0"
    assert about_me == "Hello, I am User-0"
    assert followerCount == 0
    assert followingCount == 0
    assert balance == 0


def test_duplicate_create_user(social_media):
    social_media.createUser()
    prev_user_count = social_media.getUserCount()
    social_media.createUser()
    cur_user_count = social_media.getUserCount()
    assert prev_user_count == cur_user_count


def test_user_count(social_media):
    prev_user_count = social_media.getUserCount()
    social_media.createUser()
    cur_user_count = social_media.getUserCount()
    assert prev_user_count == cur_user_count - 1


def test_user_created_event(social_media):
    txn = social_media.createUser()
    event = txn.events["UserCreated"]
    assert event["user"] == accounts[0]
    assert event["username"] == "User-0"
    assert event["aboutMe"] == "Hello, I am User-0"


def test_update_username(social_media):
    social_media.createUser()
    prev_username = social_media.getUsername(accounts[0])
    social_media.updateUsername("JanardhanJasPal")
    new_username = social_media.getUsername(accounts[0])
    assert new_username == "JanardhanJasPal"


def test_update_username_short(social_media):
    social_media.createUser()
    with brownie.reverts():
        social_media.updateUsername("short")


def test_update_aboutme(social_media):
    social_media.createUser()
    prev_aboutme = social_media.getAboutMe(accounts[0])
    social_media.updateAboutMe("temp")
    new_aboutme = social_media.getAboutMe(accounts[0])
    assert new_aboutme == "temp"


def test_following_follower(social_media):
    social_media.createUser()
    social_media.createUser({"from": accounts[1]})
    prev_follow_no = social_media.getFollowerCount(accounts[0])
    prev_follower_no = social_media.getFollowingCount(accounts[1])
    social_media.follow(accounts[0], {"from": accounts[1]})
    new_follow_no = social_media.getFollowerCount(accounts[0])
    assert prev_follow_no == new_follow_no - 1
    assert social_media.getFollowingCount(accounts[1]) == prev_follower_no + 1
