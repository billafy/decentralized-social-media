import Post from '../../../models/Post';
import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
	if(req.method !== 'POST')
		return res.status(405).json({success: false, message: 'Method Not Allowed'});

	const session = await getSession({ req });
	if (!session) return res.status(401).json({ success: false });

	const { mediaUrl, description } = req.body;
	if (!mediaUrl.startsWith('ipfs://')) return res.status(400).json({ success: false, message: 'Invalid Media URL' });

	try {
		await mongoose.connect(process.env.MONGO_URI);

		let post = await Post({
			mediaUrl,
			description,
			user: session.user._id,
		});
		post = await post.save();

		res.status(201).json({ success: true, message: `Post created with ID ${post._id}`, post });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

export default handler;
