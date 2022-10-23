import Post from '../../../../models/Post';
import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
	if(req.method !== 'PUT')
		return res.status(405).json({success: false, message: 'Method Not Allowed'});

	const session = await getSession({ req });
	if (!session) return res.status(401).json({ success: false });

	const { _id } = req.body;

	try {
		await mongoose.connect(process.env.MONGO_URI);

		let post = await Post.findById(_id);
		if (!post) return res.status(400).json({ success: false, message: 'Invalid Post ID' });
		if (post.likes.includes(session.user._id)) post.likes = post.likes.filter(like => like !== session.user._id);
		else post.likes.push(session.user._id);
		post = await post.save();

		res.status(201).json({ success: true, message: `Post liked with ID ${_id}`, post });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

export default handler;
