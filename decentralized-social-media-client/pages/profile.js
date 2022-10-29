import Profile from "../components/Profile";

const ProfilePage = ({user, posts}) => {
	return (
		<Profile
			user={user}
			posts={posts}
		/>
	);
}

export async function getServerSideProps({ query }) {
	const mongoose = (await import('mongoose')).default;
	const UserSchema = (await import('../models/User')).default;
	const PostSchema = (await import('../models/Post')).default;
	const CommentSchema = (await import('../models/Comment')).default;

	await mongoose.connect(process.env.MONGO_URI);

	try {
		const user = await UserSchema.findById(query.id, { updatedAt: 0, __v: 0, profileId: 0}).exec();
		if (!user) throw 'Not Found';
		const posts = await PostSchema.find({user: user._id}, { updatedAt: 0, __v: 0, comments: 0, likes: 0, description: 0 })
			.populate('user', {createdAt: 0, updatedAt: 0, __v: 0, profileId: 0})
			.exec();
		return {
			props: { user: JSON.parse(JSON.stringify(user)), posts: JSON.parse(JSON.stringify(posts)) },
		};
	} catch (err) {
		console.log(err);
		return {
			notFound: true,
		};
	}
}

export default ProfilePage;
