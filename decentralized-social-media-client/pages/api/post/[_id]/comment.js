import { getSession } from 'next-auth/react';
import Post from '../../../../models/Post';
import User from '../../../../models/User';
import Comment from '../../../../models/Comment';
import mongoose from 'mongoose';

const handler = async (req, res) => {
	if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method Not Allowed' });

    const session = await getSession({ req });
	if (!session) return res.status(401).json({ success: false });

	const { _id } = req.query;
	const { text } = req.body;

	if(!text.trim())
		return res.status(400).json({success: false, message: 'Comment cannot be blank'});

	await mongoose.connect(process.env.MONGO_URI);

	try {
		let post = await Post.findById(_id);
		if (!post) return res.status(400).json({ success: false, message: 'Invalid Post ID' });
        const comment = new Comment({
            user: session.user._id,
            text
        });
        await comment.save();
        post.comments.push(comment);
        post = await post.save();
		res.json({ success: true, message: `Commented on post with ID ${_id}`, post });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

export default handler;
