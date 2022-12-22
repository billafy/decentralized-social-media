import Tab from '../styled/Tab.styled';
import Tabs from '../styled/Tabs.styled';
import Link from 'next/link';
import { Blockie } from '@web3uikit/web3';
import { PostGrid } from '../styled/Grid.styled';
import Posts from '../Posts';

const Search = ({ users, posts }) => {
	const tabs = [
		{
			id: 1,
			title: 'Users',
			content: users.length
				? <div>
						{users.map((user, i) => {
							return (
								<Link key={i} href={{ pathname: '/profile', query: { id: user._id.toString() } }} passHref>
									<a>
										<Blockie seed={user.address} size={10}/>
										<p>{user.username}</p>
									</a>
								</Link>
							);
						})}
					</div>
				: <Tab />,
		},
		{
			id: 2,
			title: 'Posts',
			content: posts.length
				? <PostGrid>
						{posts.map((post, i) => {
							return (
								<Link key={i} href={{ pathname: '/post', query: { id: post._id.toString() } }} passHref>
									<a>
										<Posts key={post._id.toString()} post={post} />
									</a>
								</Link>
							);
						})}
					</PostGrid>
				: <Tab />,
		},,
		{ id: 3, title: 'NFTs', content: <Tab /> },
	];

	return (
		<div>
			<Tabs data={tabs} mt="2rem" />
		</div>
	);
};

export default Search;
