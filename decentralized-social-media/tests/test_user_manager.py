# write tests for UserManager contract here

"""
use the SocialMedia contract to call UserManager functions
as SocialMedia inherits UserManager
"""
import os
import pytest
from brownie import Wei, accounts, SocialMedia

@pytest.fixture
def social_media():
    return SocialMedia.deploy(0.001, {'from': accounts[0]})

def test_user_count(social_media):
    social_media = SocialMedia[-1]
    prev_user_count = social_media.getUserCount()
    social_media.createUser()
    cur_user_count = social_media.getUserCount()
    assert prev_user_count == cur_user_count - 1

def test_update_username(social_media):
    social_media = SocialMedia[-1]
    social_media.createUser()
    prev_username = social_media.getUsername(accounts[0])
    social_media.updateUsername("JanardhanJasPal", {'from':accounts[0]})
    new_username = social_media.getUsername(accounts[0])
    assert prev_username != new_username

def test_update_aboutme(social_media):
    social_media = SocialMedia[-1]
    social_media.createUser()
    prev_aboutme = social_media.getAboutMe(accounts[0])
    social_media.updateAboutMe("temp")
    new_aboutme = social_media.getAboutMe(accounts[0])
    assert prev_aboutme != new_aboutme

def test_following_follower(social_media):
    social_media = SocialMedia[-1]
    social_media.createUser()
    prev_follow_no = social_media.getFollowerCount(accounts[0])
    prev_follower_no = social_media.getFollowingCount(accounts[1])
    social_media.follow(accounts[0], {'from': accounts[1]})
    new_follow_no = social_media.getFollowerCount(accounts[0])
    assert prev_follow_no == new_follow_no - 1
    assert social_media.getFollowingCount(accounts[1]) == prev_follower_no + 1

 


