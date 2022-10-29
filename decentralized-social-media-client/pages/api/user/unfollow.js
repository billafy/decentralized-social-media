import User from '../../../models/User';
import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';

const unfollow = async (req, res) => {
	if (req.method !== 'DELETE') return res.status(405).json({ success: false, message: 'Method Not Allowed' });

	const session = await getSession({ req });
	if (!session) return res.status(401).json({ success: false });

	const { _id } = req.body;

	await mongoose.connect(process.env.MONGO_URI);

	let user = await User.findById(session.user._id);
	let followingUser = await User.findById(_id);
	if (!followingUser)
		return res.status(400).json({ success: false, message: `User with ID ${_id} does not exist` });
	else if (followingUser._id === session.user._id)
		return res.status(400).json({ success: false, message: 'Cannot unfollow yourself' });
	else if (!user.following.find(follow => follow._id === _id))
		return res.status(400).json({ success: false, message: 'Already unfollowed' });
	else {
		user.following = user.following.filter(follow => follow._id !== followingUser._id);
		followingUser.followers = followingUser.followers.filter(follow => follow._id !== user._id);
		user = await user.save();
		followingUser.save();
		return res.status(201).json({ success: true, message: `Followed user with ID ${_id}`, user });
	}
};

export default unfollow;
