import styled from "styled-components";
import Image from "next/image";
import { Colors, Devices } from "./Theme";
import { BsInstagram, BsFillPatchCheckFill } from "react-icons/bs";
import { GrTwitter, GtTwitter } from "react-icons/gr";
import NFTCard from "./styled/NFTCard.styled";
import Grid from "./styled/Grid.styled";
import Head from "next/head";
import Tabs from "./styled/Tabs.styled";
import Tab from "./styled/Tab.styled";
import { NFTs } from "../constants/info";
import { Button } from "@web3uikit/core";
import { IoPencilSharp } from "react-icons/io5";
import Link from "next/link";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import { useState } from "react";

const ProfileEl = styled.article`
	background-color: ${Colors.Primary};
	color: ${Colors.Black};
	display: flex;
	flex-direction: column;
`;
const Cover = styled.div`
	position: relative;
	width: 100%;
	text-align: center;

	height: 800px;
	padding: 100px;

	@media ${Devices.Laptop} {
		height: 300px;
	}
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20 4rem;
	gap: 2rem;
	padding: 20px;

	@media ${Devices.Laptop} {
		flex-direction: row;
	}
`;
const Info = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	margin: auto;

	@media ${Devices.Laptop} {
		max-width: 25vw;
		align-items: flex-start;
	}
`;

const Avatar = styled.span`
	transform: translateY(-50%);
	border: 5px solid ${Colors.Secondary};
	border-radius: 50%;
	overflow: hidden;
	width: 150px;
	height: 150px;
	display: block;
	margin-left: auto;
	margin-right: auto;
`;

const Name = styled.h1`
	margin-top: -50px;
	margin-bottom: 0.5rem;
	color: ${Colors.Secondary};
`;

const Bio = styled.p`
	white-space: pre-wrap;
	font-size: 1rem;
	margin-bottom: 1rem;
`;

const Stats = styled.div`
	width: 100%;
	border-top: 1px solid ${Colors.Border};
	border-bottom: 1px solid ${Colors.Border};
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	align-items: center;
	justify-content: center;
`;
const StatItem = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.25rem;
`;

const StatTitle = styled.span`
	color: ${Colors.Gray};
	:hover {
		transform: scale(1.5);
		color: ${Colors.Secondary};
	}
`;

const StatValue = styled.span`
	font-weight: 500;
`;

const AllTabs = [
	{
		Id: 1,
		Title: "Collectibles",
		Content: (
			<Grid>
				{NFTs.map((nft) => {
					return <NFTCard key={nft.Id} item={nft} />;
				})}
			</Grid>
		),
	},
	{ Id: 2, Title: "Selling", Content: <Tab /> },
	{ Id: 3, Title: "Created", Content: <Tab /> },
	{ Id: 4, Title: "Liked", Content: <Tab /> },
];

export default function Profile(props) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	function openHandler() {
		setModalIsOpen(true);
	}

	function closeModalHandler() {
		setModalIsOpen(false);
	}

	return (
		<ProfileEl>
			<Head>
				<title>NFTChain - {props.user}</title>
			</Head>
			<Cover>
				<Info>
					<Avatar>
						<Image
							src={props.src}
							layout="fill"
							//   width="150"
							//   height="150"
						/>
					</Avatar>
				</Info>
				<Name>
					{props.user}
					<BsFillPatchCheckFill />{" "}
				</Name>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Button onClick={openHandler} text="Follow" />
				</div>

				{modalIsOpen && (
					<Modal
						followers={props.followerList}
						onCancel={closeModalHandler}
					/>
				)}
				{modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
				<Bio>{props.bio}</Bio>
				<Stats>
					<StatItem>
						<StatTitle>Likes</StatTitle>
						<StatValue>{props.likes}</StatValue>
					</StatItem>
					<StatItem>
						<StatTitle>ETH balance</StatTitle>
						<StatValue>{props.balance}</StatValue>
					</StatItem>
					<StatItem>
						<StatTitle>
							<a onClick={openHandler}>Followers</a>
						</StatTitle>
						<StatValue>{props.followers}</StatValue>
					</StatItem>
					<StatItem>
						<StatTitle>
							<a href="www.google.com">Following</a>
						</StatTitle>
						<StatValue>{props.following}</StatValue>
					</StatItem>
				</Stats>
				<Content>
					{/* Tabs */}
					<Tabs data={AllTabs} mt="2rem" />
				</Content>
			</Cover>
		</ProfileEl>
	);
}
