import Search from '../components/Search';
import {serialize} from '../utils';

export default function SearchPage({ users, posts }) {
	return <Search users={users} posts={posts}/>;
}

export async function getServerSideProps({ query }) {
	const mongoose = (await import('mongoose')).default;
	const UserSchema = (await import('../models/User')).default;
	const PostSchema = (await import('../models/Post')).default;

	await mongoose.connect(process.env.MONGO_URI);

	try {
		const users = await UserSchema.find({ username: { $regex: query.query, $options: 'i' } }, [ 'username', 'address' ])
			.exec();
		const posts = await PostSchema
			.find({ description: { $regex: query.query, $options: 'i' } }, { updatedAt: 0, __v: 0 })
			.populate('user', [ 'username', 'address' ]);
		return {
			props: serialize({users, posts}),
		};
	} catch (err) {
		console.log(err);
		return {
			notFound: true,
		};
	}
}
