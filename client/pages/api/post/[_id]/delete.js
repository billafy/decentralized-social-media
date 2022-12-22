import Post from '../../../../models/Post';
import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
	if(req.method !== 'DELETE')
		return res.status(405).json({success: false, message: 'Method Not Allowed'});

	const session = await getSession({ req });
	if (!session) return res.status(401).json({ success: false });

	const { _id } = req.body;

	try {
		await mongoose.connect(process.env.MONGO_URI);

		const post = await Post.findById(_id);
		if (!post) return res.status(400).json({ success: false, message: 'Invalid Post ID' });
		if (post.user !== session.user._id) return res.status(401).json({ success: false, message: 'Unauthorized' });
		await Post.deleteOne({ _id: post._id });

		res.status(201).json({ success: true, message: `Post deleted with ID ${_id}` });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

export default handler;
