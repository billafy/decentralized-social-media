import { useState } from 'react';
import Image from 'next/image';
import { IoIosHeart, IoIosSend, IoIosBookmark, IoIosHappy } from 'react-icons/io';
import { BsHeart, BsFillEyeFill, BsThreeDots } from 'react-icons/bs';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import Comment from './Comment';
import Head from 'next/head';
import { PostData } from '../../constants/info';
import AddComment from './AddComment';
import { Blockie } from '@web3uikit/web3';
import Moment from 'react-moment';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
    ShareLeft
} from './styled/index.styled';

export default function Post({ post }) {
	const [ currentPost, setCurrentPost ] = useState(post);
	const { isLoggedIn, userProfile } = useSelector(state => state.auth);

	const likeToggle = async () => {
		try {
			const response = await axios.put(`/api/post/${post._id.toString()}/likeToggle`);
			setCurrentPost(response.data.post);
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
									? <i onClick={likeToggle}><AiFillHeart color="#DC143C" /></i>
									: <i onClick={likeToggle}><AiOutlineHeart color="#DC143C" /></i>}
							</ShareLeft>
							<ShareLeft><i><GoComment color="#000000" /></i></ShareLeft>
						</Share>
					</Interact>
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
                        <AddComment />
						{currentPost.comments.map(comment => {
							return <Comment comment={comment} />;
						})}
					</Des>
				</RightSection>
			</SectionContainer>
		</PostEl>
	);
}
