import { NFTs } from '../../constants/info';
import Grid from '../styled/Grid.styled';
import Link from 'next/link';
import NFTCard from '../styled/NFTCard.styled';
import { TopCollectiblesEl, Title, TopSection, Sort, Date, ShowMore } from './styled/TopCollectibles.styled';

const TopCollectibles = () => {
	return (
		<TopCollectiblesEl>
			<Title>Top NFTs</Title>
			<Grid>
				{NFTs.map(nft => {
					return (
						<Link key={nft.Id} href={{ pathname: '/asset', query: { id: nft.Id } }} passHref>
							<a>
								<NFTCard item={nft} />
							</a>
						</Link>
					);
				})}
			</Grid>
			<ShowMore>Show More</ShowMore>
		</TopCollectiblesEl>
	);
};

export default TopCollectibles;
