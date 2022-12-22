import { BannerEl, Content, Title, Sub, Input, Btn, Text, PL, ChBox } from './styled/Banner.styled';

const Banner = () => {
	return (
		<BannerEl>
			<Content>
				<Title>Advancing your social life into NFTs</Title>
				<Sub>
					ChainSpace is a platform which leverages the power of both
					worlds. Engage in community interaction while earning
					through NFTs of your content.
				</Sub>
				<a href="/register">
					<Btn>Join</Btn>
				</a>
			</Content>
		</BannerEl>
	);
};

export default Banner;
