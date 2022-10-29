import Head from 'next/head';
import Tabs from '../styled/Tabs.styled';
import { Button } from '@web3uikit/core';
import { Blockie } from '@web3uikit/web3';
import Edit from './Edit';
import Modal from './Modal';
import Backdrop from './Backdrop';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PostGrid } from '../styled/Grid.styled';
import Grid from '../styled/Grid.styled';
import { NFTs } from '../../constants/info';
import Link from 'next/link';
import NFTCard from '../styled/NFTCard.styled';
import Tab from '../styled/Tab.styled';
import Posts from '../Posts';
import {
	ProfileEl,
	Cover,
	Content,
	Info,
	Avatar,
	Name,
	Bio,
	Stats,
	StatItem,
	StatValue,
	StatTitle
} from './styled/index.styled';

const Profile = ({ user, posts }) => {
	const { auth: { isLoading, userProfile } } = useSelector(state => state);
	const [ isModalOpen, setIsModalOpen ] = useState(false);
	const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);

	const tabs = [
		{
			id: 1,
			title: 'Posts',
			content: posts.length ? (
				<PostGrid>
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
			) : <Tab/>,
		},
		{ id: 2, title: 'NFTs On Sale', content: <Tab /> },
		{ id: 3, title: 'Liked', content: <Tab /> },
	];

	if (isLoading) return <p style={{ textAlign: 'center', margin: '3rem 0px', fontSize: '3rem' }}>Loading...</p>;
	return (
		<ProfileEl>
			<Head>
				<title>ChainSpace - Profile</title>
			</Head>
			<Cover>
				<Info>
					<Avatar>
						<Blockie seed={user.address} size={40} />
					</Avatar>
				</Info>
				<Name>
					{user.username}
					{user._id === userProfile._id && <Button onClick={() => setIsEditModalOpen(true)} text="✏️" />}
				</Name>
				<div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0px', gap: '0.5rem' }}>
					<Button onClick={() => setIsModalOpen(true)} text="Follow" />
				</div>
				{isEditModalOpen && <Edit onCancel={() => setIsEditModalOpen(false)} />}
				{isEditModalOpen && <Backdrop onCancel={() => setIsEditModalOpen(false)} />}
				{isModalOpen && <Modal followers={user.followers} onCancel={() => setIsModalOpen(false)} />}
				{isModalOpen && <Backdrop onCancel={() => setIsModalOpen(false)} />}
				<Bio>{user.aboutMe}</Bio>
				<Stats>
					<StatItem>
						<StatTitle>Likes</StatTitle>
						<StatValue>0</StatValue>
					</StatItem>
					<StatItem>
						<StatTitle>Earnings</StatTitle>
						<StatValue>0 ETH</StatValue>
					</StatItem>
					<StatItem>
						<StatTitle>
							<a onClick={() => setIsModalOpen(true)}>Followers</a>
						</StatTitle>
						<StatValue>{user.followers.length}</StatValue>
					</StatItem>
					<StatItem>
						<StatTitle>
							<a onClick={() => setIsModalOpen(true)}>Following</a>
						</StatTitle>
						<StatValue>{user.following.length}</StatValue>
					</StatItem>
				</Stats>
				<Content>
					<Tabs data={tabs} mt="2rem" />
				</Content>
			</Cover>
		</ProfileEl>
	);
};

export default Profile;
