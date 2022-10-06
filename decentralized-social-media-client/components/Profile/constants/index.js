import { PostGrid } from '../../styled/Grid.styled';
import Grid from '../../styled/Grid.styled';
import { NFTs, PostData } from '../../../constants/info';
import Link from 'next/link';
import NFTCard from '../../styled/NFTCard.styled';
import Tab from '../../styled/Tab.styled';
import Posts from '../../Posts';

export const tabs = [
	{
		Id: 1,
		Title: 'Posts',
		Content: (
			<PostGrid>
				{PostData.map((post, i) => {
					return (
						<Link key={i} href={{ pathname: '/post', query: { id: post.Id } }} passHref>
							<a>
								<Posts key={post.Id} item={post} />
							</a>
						</Link>
					);
				})}
			</PostGrid>
		),
	},
	{
		Id: 2,
		Title: 'NFTs On Sale',
		Content: (
			<Grid>
				{NFTs.map((nft, i) => {
					return (
						<Link key={i} href={{ pathname: '/asset', query: { id: nft.Id } }} passHref>
							<a>
								<NFTCard key={nft.Id} item={nft} />
							</a>
						</Link>
					);
				})}
			</Grid>
		),
	},
	{ Id: 4, Title: 'Liked', Content: <Tab /> },
];
