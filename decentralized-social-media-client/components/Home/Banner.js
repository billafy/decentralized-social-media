import styled from "styled-components";
import { Colors, Devices } from "../Theme";
import Button from "../styled/Button.styled";

const BannerEl = styled.article`
	display: flex;
	justify-content: center;
	text-align: center;
	background: url("https://wallpapercave.com/wp/wp5910898.jpg");
	background: url("https://advertisingweek.com/wp-content/uploads/2022/02/169the-smart-city-of-cyberspace-and-metaverse-digital-data-of-futuristic-picture-id1357404897-1170x600.jpg");
	background: url("https://coinchapter.com/wp-content/uploads/2022/03/Metaverse.jpg");
	background-size: 100% 100%;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	gap: 1rem;
	@media ${Devices.MobileL} {
		padding: 6rem 0px;
	}
	@media ${Devices.Tablet} {
		padding: 6rem 0px;
	}
	@media ${Devices.Laptop} {
		padding: 6rem 0px;
	}
`;

const Content = styled.div`
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100vw;
	@media ${Devices.MobileL} {
		padding: 1.5rem 4rem;
	}
	@media ${Devices.Tablet} {
		padding: 1.5rem 6rem;
	}
	@media ${Devices.Laptop} {
		padding: 1.5rem 30%;
	}
`;

const Title = styled.h2`
	font-weight: 500;
	font-size: 4vw;
	color: white;
`;
const Sub = styled.span`
	font-size: 1.12rem;
	color: white;
	line-height: 2.5rem;
	letter-spacing: 0.125rem;
`;
const Input = styled.div`
	display: flex;
	height: 3rem;
	width: 100%;

	> input {
		border: none;
		border-radius: 5px 0 0 5px;
		padding: 0.5rem 1rem;
		font-size: 1.05rem;
		flex: 1;
	}
`;
const Btn = styled(Button)`
	border-radius: 5px;
	font-weight: 600;
	font-size: 1.2rem;
	padding: 10px;
	width: 6.25rem;
	background-color: ${Colors.Secondary};
	display: block;
	margin: auto;
`;
const Text = styled.p`
	font-size: 0.85rem;
`;
const PL = styled.a`
	color: ${Colors.Primary};
`;
const ChBox = styled.div`
	font-size: 0.85rem;

	input {
		margin-right: 1rem;
	}
`;

export default function Banner() {
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
}
