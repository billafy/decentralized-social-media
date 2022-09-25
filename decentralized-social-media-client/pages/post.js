import React from 'react';
import Post from '../components/Post';
import { Users } from '../constants/info';
import { PostData } from '../constants/info';
import { useRouter } from 'next/router';

export default function PostPage() {
	const router = useRouter();
	const id = router.query.id - 1;
	const img = PostData[id].PostImage;
	const caption = PostData[id].Caption;
	const author = PostData[id].Author;
	const likes = PostData[id].Likes;
	const views = PostData[id].views;
	const avi = PostData[id].Avatar;
	const commentData = PostData[id].Comments[0].Comment;
	const commentauth = PostData[id].Comments[0].Author;
	const commentavi = PostData[id].Comments[0].Avatar;

	return (
		<Post
			comments={commentData}
			commentauth={commentauth}
			commentavi={commentavi}
			id={id}
			img={img}
			caption={caption}
			likes={likes}
			views={views}
			author={author}
			avatar={avi}
		/>
	);
}
