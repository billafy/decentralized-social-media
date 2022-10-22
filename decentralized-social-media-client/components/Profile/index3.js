import Head from 'next/head';
import Tabs from '../styled/Tabs.styled';
import { Button } from '@web3uikit/core';
import { Blockie } from '@web3uikit/web3';
import Edit from './Edit';
import Modal from './Modal';
import Backdrop from './Backdrop';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';
import { tabs } from './constants';
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

const Profile = props => {
	const router = useRouter();
	const { auth: { loading, userProfile } } = useSelector(state => state);
	const [ isModalOpen, setIsModalOpen ] = useState(false);
	const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
	const { account, isWeb3Enabled } = useMoralis();

	useEffect(
		() => {
			if (!isWeb3Enabled && !loading) router.replace('/');
		},
		[ isWeb3Enabled, loading ]
	);

	if (loading) return <p style={{ textAlign: 'center', margin: '3rem 0px', fontSize: '3rem' }}>Loading...</p>;
	return (
		<ProfileEl>
			<Head>
				<title>ChainSpace - Profile</title>
			</Head>
			<Cover>
				<Info>
					<Avatar>
						<Blockie seed={account} size={40} />
					</Avatar>
				</Info>
				<Name>
					{userProfile.username}
				</Name>
				<div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0px', gap: '0.5rem' }}>
					<Button onClick={() => setIsModalOpen(true)} text="Follow" />
					<Button onClick={() => setIsEditModalOpen(true)} text="✏️" />
				</div>
				{isEditModalOpen && <Edit onCancel={() => setIsEditModalOpen(false)} />}
				{isModalOpen && <Backdrop onCancel={() => setIsEditModalOpen(false)} />}
				{isModalOpen && <Modal followers={props.followerList} onCancel={() => setIsModalOpen(false)} />}
				{isModalOpen && <Backdrop onCancel={() => setIsModalOpen(false)} />}
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
							<a onClick={() => setIsModalOpen(true)}>Followers</a>
						</StatTitle>
						<StatValue>{userProfile.followerCount}</StatValue>
					</StatItem>
					<StatItem>
						<StatTitle>
							<a onClick={() => setIsModalOpen(true)}>Following</a>
						</StatTitle>
						<StatValue>{userProfile.followingCount}</StatValue>
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
