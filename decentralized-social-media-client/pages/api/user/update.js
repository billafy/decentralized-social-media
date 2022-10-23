import User from '../../../models/User';
import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
	if(req.method !== 'PUT')
		return res.status(405).json({success: false, message: 'Method Not Allowed'});

	const session = await getSession({ req });
	if (!session) return res.status(401).json({ success: false });

	const { username, aboutMe } = req.body;
	if (username?.length < 6)
		return res.status(400).json({ success: false, message: 'Username should be of atleast 6 characters' });

	try {
		await mongoose.connect(process.env.MONGO_URI);

		if (username !== session.user.username && (await User.findOne({ username })))
			return res.status(400).json({ success: false, message: `User with username ${username} already exists` });

		let user = await User.findById(session.user._id);
		user.username = username;
		user.aboutMe = aboutMe;
		user = await user.save();

		res.status(201).json({ success: true, message: `User updated with ID ${user._id}`, user });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

export default handler;
