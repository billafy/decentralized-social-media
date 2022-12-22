import Head from 'next/head';
import { BsGithub, BsGlobe } from 'react-icons/bs';
import Link from 'next/link';
import Hero from './Hero';
import Banner from './Banner';
import Carousel from './Carousel';
import Video from './Video';
import TopCollectibles from './TopCollectibles';
import { HomeEl } from './styled/index.styled';

const Home = () => {
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
};

export default Home;
