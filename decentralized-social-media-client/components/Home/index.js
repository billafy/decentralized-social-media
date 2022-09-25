import Head from 'next/head';
import styled from 'styled-components';
import { Colors, Devices } from '../Theme';
import { BsGithub, BsGlobe } from 'react-icons/bs';
import Link from 'next/link';
import Hero from './Hero';
import Banner from './Banner';
import Carousel from './Carousel';
import Video from './Video';
import TopCollectibles from './TopCollectibles';

const HomeEl = styled.article`
  color: ${Colors.Secondary};
`;

export default function Home() {
	return (
		<HomeEl>
			<Head>
				<title>ChainSpace</title>
				<meta name="description" content="Cleaned create-next-app including styled-components and configured theme" />
				<link rel="icon" href="/favicon.png" />
			</Head>
			<Banner />
			<Carousel />
			<TopCollectibles />
		</HomeEl>
	);
}
