import Post from '../../../../models/Post';
import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
	if(req.method !== 'PUT')
		return res.status(405).json({success: false, message: 'Method Not Allowed'});

	const session = await getSession({ req });
	if (!session) return res.status(401).json({ success: false });

	const { _id } = req.query;

	try {
		await mongoose.connect(process.env.MONGO_URI);

		let post = await Post.findById(_id);
		if (!post) return res.status(400).json({ success: false, message: 'Invalid Post ID' });
		if(post.likes.find(like => like.toString() === session.user._id.toString()))
			post.likes = post.likes.filter(like => like.toString() !== session.user._id.toString());
		else
			post.likes.push(session.user._id);
		await post.save();
		post = await Post.findById(_id, { updatedAt: 0, __v: 0 })
			.populate('user', [ 'username', 'address' ])
			.populate({
				path: 'comments',
				select: [ 'likes', 'text', 'user' ],
				populate: {
					path: 'user',
					select: [ 'username', 'address' ],
				},
			});
		res.status(201).json({ success: true, message: `Post liked with ID ${_id}`, post });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

export default handler;
