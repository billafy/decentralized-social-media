import Post from '../../../models/Post';
import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
	if(req.method !== 'GET')
		return res.status(405).json({success: false, message: 'Method Not Allowed'});

	const session = await getSession({ req });
	if (!session) return res.status(401).json({ success: false });

	try {
		await mongoose.connect(process.env.MONGO_URI);

		const user = await User.findById(session.user._id);

		let posts = [];
		for (const followingUser of user.following) {
			const followingPosts = await Post.find({ user: followingUser });
			posts = [ ...posts, ...followingPosts ];
		}
		posts.sort((post1, post2) => {
			return new Date(post2.createdAt) - new Date(post1.createdAt);
		});

		res.json({ success: true, message: `${posts.length} post(s) fetched`, posts });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

export default handler;
