import Head from "next/head";
import styled from "styled-components";
import { Colors, Devices } from "./Theme";
import { BsGithub, BsGlobe } from "react-icons/bs";
import Link from "next/link";
import Hero from "./Home/Hero";
import Banner from "./Home/Banner";
import Carousel from "./Home/Carousel";
import Video from "./Home/Video";
import TopCollectibles from "./Home/TopCollectibles";

const HomeEl = styled.article`
  color: ${Colors.Secondary};
`;

export default function Home() {
  return (
    <HomeEl>
      <Head>
        <title>NFTSpace</title>
        <meta
          name="description"
          content="Cleaned create-next-app including styled-components and configured theme"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Banner />
      <Carousel />
      <TopCollectibles />
    </HomeEl>
  );
}
