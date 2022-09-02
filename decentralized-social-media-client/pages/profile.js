import React from "react";
import Profile from "../components/Profile";
import { Users } from "../constants/info";

const followingList = Users[0].Following;
const followerList = Users[0].Followers;
const likes = Users[0].Likes;

export default function profile() {
	return (
		<Profile
			likes={likes}
			followingList={followingList}
			followerList={followerList}
		/>
	);
}
