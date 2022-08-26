import React from "react";
import Profile from "../src/components/Profile";
import { Users } from "../src/Info";

const currentUser = Users[0].username;
const followingList = Users[0].Following;
const followingCount = Users[0].Following.length;
const followerList = Users[0].Followers;
const followerCount = Users[0].Followers.length;
const userBio = Users[0].Bio;
const imgSrc = Users[0].Imgsrc;
const balance = Users[0].Balance;
const likes = Users[0].Likes;

export default function profile() {
	return (
		<Profile
			user={currentUser}
			src={imgSrc}
			likes={likes}
			balance={balance}
			followingList={followingList}
			followerList={followerList}
			followers={followerCount}
			bio={userBio}
			following={followingCount}
		/>
	);
}
