import { useState } from 'react';
import Image from 'next/image';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import Comment from './Comment';
import Head from 'next/head';
import AddComment from './AddComment';
import { Blockie } from '@web3uikit/web3';
import { Button } from '@web3uikit/core';
import { useWeb3Contract } from 'react-moralis';
import Moment from 'react-moment';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import axios from 'axios';
import marketplaceAbi from '../../constants/abi.json';
import addresses from '../../constants/addresses.json';
import Moralis from 'moralis';
import {ethers} from 'ethers';
import {
    PostEl,
    SectionContainer,
    LeftSection,
    RightSection,
    AuthorContainer,
    AvatarEl,
    TimeLabel,
    UsernameEl,
    Title,
    Likes,
    LikesEl,
    ImageEl,
    Des,
    Interact,
    Share,
    ShareLeft,
} from './styled/index.styled';

export default function Post({ post }) {
	const [ currentPost, setCurrentPost ] = useState(post);
	const { userProfile } = useSelector(state => state.auth);
	const [postURI, setPostURI] = useState('');
	const { runContractFunction: mintPost } = useWeb3Contract({
		abi: marketplaceAbi,
		contractAddress: addresses[process.env.NEXT_PUBLIC_CHAIN_ID],
		functionName: 'mintPost',
		msgValue: ethers.utils.parseEther('0.0001'),
		params: {postURI: postURI},
	});

	const likeToggle = async () => {
		try {
			const response = await axios.put(`/api/post/${post._id.toString()}/likeToggle`);
			setCurrentPost(response.data.post);
		} catch (err) {
			console.log(err);
		}                                                
	};

	const mintNft = async () => {
		await Moralis.start({ apiKey: 'BTVSYEbVjhpDyl5kVeF77g69T1oCNcAiiexJ81ceRh9dJyvNtg3o9mRSgdkmxE4j' });
		try {
			// const ipfsResponse = await Moralis.EvmApi.ipfs.uploadFolder({
			// 	abi: [{path: `${currentPost._id}.json`, content: {
			// 		name: 'Test NFT',
			// 		description: currentPost.description,
			// 		image: currentPost.mediaUrl,
			// 	}}]
			// });
			// console.log(ipfsResponse.data[0].path);
			// setPostURI(ipfsResponse.data[0].path);
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner()
			const marketplace = new ethers.Contract(addresses[process.env.NEXT_PUBLIC_CHAIN_ID], marketplaceAbi, signer);
			await marketplace.mintPost('https://ipfs.moralis.io:2053/ipfs/QmdY9FoAxA4S2VxBJHL3rCfC2HNE9SEHAe74CXHuQBg875/6366a723d6a972eae3502e04.json');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<PostEl>
			<Head>Post</Head>
			<SectionContainer>
				<LeftSection>
					<ImageEl>
						<Image src={currentPost.mediaUrl} layout="responsive" width="1000px" height="1000px" />
					</ImageEl>
					<Interact>
						<Share>
							<ShareLeft>
								{currentPost.likes.includes(userProfile._id)
									? <AiFillHeart color="#DC143C" onClick={likeToggle}/>
									: <AiOutlineHeart color="#DC143C" onClick={likeToggle}/>}
							</ShareLeft>
							<ShareLeft><GoComment color="#000000"/></ShareLeft>
						</Share>
					</Interact>
					{currentPost.user._id === userProfile._id && !currentPost.isMinted && 
						<Button text='Mint NFT' onClick={mintNft}/>
					}
				</LeftSection>
				<RightSection>
					<AuthorContainer>
						<AvatarEl>
							<Blockie seed={currentPost.user.address} size={12.5} />
						</AvatarEl>
						<div style={{ display: 'inline' }}>
							<UsernameEl>
								<Link href={{ pathname: '/profile', query: { id: currentPost.user._id.toString() } }} passHref>
									{currentPost.user.username}
								</Link>
							</UsernameEl>
                            <TimeLabel>
                                <Moment fromNow>{currentPost.createdAt}</Moment> - {" "}
                                <Moment format="D MMM YYYY" withTitle>
    								{currentPost.createdAt}
    							</Moment>
                            </TimeLabel>
						</div>
					</AuthorContainer>
					<div style={{ display: 'inline' }}>
						<Title>{currentPost.description}</Title>
					</div>
					<Likes>
						<LikesEl>
							{currentPost.likes.includes(userProfile._id) ? <AiFillHeart color="#DC143C"/> : <AiOutlineHeart color="#DC143C" />} {currentPost.likes.length}
						</LikesEl>
						<LikesEl>
                            <GoComment /> {currentPost.comments.length}
                        </LikesEl>
					</Likes>
					<Des>
                        <AddComment post={currentPost} setPost={currentPost}/>
						{currentPost.comments.map(comment => {
							return <Comment comment={comment} />;
						})}
					</Des>
				</RightSection>
			</SectionContainer>
		</PostEl>
	);
}
