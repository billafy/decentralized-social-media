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
import { Blockie } from "@web3uikit/web3";
import { IoPencilSharp } from "react-icons/io5";
import Link from "next/link";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import {useMoralis} from 'react-moralis';
import { useRouter } from 'next/router';

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
	margin: auto;
	margin-bottom: 1.5rem;
	width: 300px;
	max-width: 95%;
	text-align: center;
`;

const Stats = styled.div`
	width: 700px;
	max-width: 95%;
	margin: auto;
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
		Title: "Posts",
		Content: (
			<Grid>
				{NFTs.map((nft) => {
					return <NFTCard key={nft.Id} item={nft} />;
				})}
			</Grid>
		),
	},
	{ Id: 2, Title: "NFTs On Sale", Content: <Tab /> },
	{ Id: 4, Title: "Liked", Content: <Tab /> },
];

export default function Profile(props) {
	const {auth: {loading, userProfile}} = useSelector(state => state);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const router = useRouter();
	const {account, isWeb3Enabled} = useMoralis();

	function openHandler() {
		setModalIsOpen(true);
	}

	function closeModalHandler() {
		setModalIsOpen(false);
	}

	useEffect(() => {
		if(!isWeb3Enabled && !loading) 
			router.replace('/');
	}, [isWeb3Enabled, loading]);

	if(loading) 
		return (
			<p style={{textAlign: 'center', margin: '3rem 0px', fontSize: '3rem'}}>Loading...</p>	
		);
	return (
		<ProfileEl>
			<Head>
				<title>ChainSpace - {userProfile.username}</title>
			</Head>
			<Cover>
				<Info>
					<Avatar>
						<Blockie seed={account} size={40}/>
						{/* <Image */}
						{/* 	src='data:image/png;base64,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' */}
						{/* 	layout="fill" */}
						{/* 	width="150" */}
						{/* 	height="150" */}
						{/* /> */}
					</Avatar>
				</Info>
				<Name>
					{userProfile.username}
				</Name>
				<div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0px" }}>
					<Button onClick={openHandler} text="Follow" />
				</div>
				{modalIsOpen && (
					<Modal
						followers={props.followerList}
						onCancel={closeModalHandler}
					/>
				)}
				{modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
				<Bio>{userProfile.aboutMe}</Bio>
				<Stats>
					<StatItem>
						<StatTitle>Likes</StatTitle>
						<StatValue>{props.likes}</StatValue>
					</StatItem>
					<StatItem>
						<StatTitle>Earnings</StatTitle>
						<StatValue>{userProfile.balance} ETH</StatValue>
					</StatItem>
					<StatItem>
						<StatTitle>
							<a onClick={openHandler}>Followers</a>
						</StatTitle>
						<StatValue>{userProfile.followerCount}</StatValue>
					</StatItem>
					<StatItem>
						<StatTitle>
							<a onClick={openHandler}>Following</a>
						</StatTitle>
						<StatValue>{userProfile.followingCount}</StatValue>
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
