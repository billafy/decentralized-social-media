import Post from '../components/Post';

const PostPage = ({ post }) => {
	if (!post) return <p>Loading...</p>;
	return <Post post={post} />;
};

export async function getServerSideProps({ query }) {
	const mongoose = (await import('mongoose')).default;
	const PostSchema = (await import('../models/Post')).default;

	try {
		await mongoose.connect(process.env.MONGO_URI);
		const post = await PostSchema.findById(query.id, { updatedAt: 0, __v: 0 })
			.populate('user', [ 'username', 'address' ])
			.populate({
				path: 'comments',
				select: [ 'likes', 'text', 'user', 'createdAt' ],
				populate: {
					path: 'user',
					select: [ 'username', 'address' ],
				},
			})
			.exec();
		if (!post) throw 'Not Found';
		return {
			props: { post: JSON.parse(JSON.stringify(post)) },
		};
	} catch (err) {
		console.log(err);
		return {
			notFound: true,
		};
	}
}

export default PostPage;
