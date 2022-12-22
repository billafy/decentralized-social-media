import Post from '../../../../models/Post';
import User from '../../../../models/User';
import Comment from '../../../../models/Comment';
import mongoose from 'mongoose';

const handler = async (req, res) => {
	if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method Not Allowed' });

	const { _id } = req.query;

	await mongoose.connect(process.env.MONGO_URI);

	try {
		const post = await Post.findById(_id, { updatedAt: 0, __v: 0 })
			.populate('user', [ 'username', 'address' ])
			.populate({
				path: 'comments',
				select: [ 'likes', 'text', 'user' ],
				populate: {
					path: 'user',
					select: [ 'username', 'address' ],
				},
			});
		if (!post) return res.status(400).json({ success: false, message: 'Invalid Post ID' });
		res.json({ success: true, message: `Post fetched with ID ${_id}`, post });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

export default handler;
