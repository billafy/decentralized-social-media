import User from '../../../models/User';
import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';

const unfollow = async (req, res) => {
	if (req.method !== 'PUT') return res.status(405).json({ success: false, message: 'Method Not Allowed' });

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
	else if (!user.following.find(follow => follow._id.toString() === followingUser._id.toString()))
		return res.status(400).json({ success: false, message: 'Already unfollowed' });
	else {
		user.following = user.following.filter(follow => follow._id.toString() !== followingUser._id.toString());
		followingUser.followers = followingUser.followers.filter(follow => follow._id.toString() !== user._id.toString());
		user = await user.save();
		followingUser = await followingUser.save();
		return res.status(201).json({ success: true, message: `Unfollowed user with ID ${_id}`, user, followingUser });
	}
};

export default unfollow;
