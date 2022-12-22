import User from '../../../models/User';
import mongoose from 'mongoose';

const handler = async (req, res) => {
	if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method Not Allowed' });

	const { query } = req.query;

	await mongoose.connect(process.env.MONGO_URI);

	const users = await User.find({ username: { $regex: query, $options: 'i' } }, ['username', 'address']);
	res.json({ success: true, message: `Found ${users.length} user(s)`, users });
};

export default handler;
