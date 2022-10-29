import Image from 'next/image';
import { IoIosHeart, IoIosSend, IoIosBookmark, IoIosHappy } from 'react-icons/io';
import { BsHeart, BsFillEyeFill, BsThreeDots } from 'react-icons/bs';
import Comment from './Comment';
import Head from 'next/head';
import { PostData } from '../../constants/info';
import AddComment from './AddComment';
import { Blockie } from '@web3uikit/web3';
import Moment from 'react-moment';
// import {
//     PostEl,
//     SectionContainer,
//     LeftSection,
//     RightSection,
//     AuthorContainer,
//     AvatarEl,
//     TimeLabel,
//     UsernameEl,
//     Title,
//     Likes,
//     LikesEl,
//     ImageEl,
//     Des,
//     Interact,
//     Share,
//     ShareLeft,
//     ShareRight
// } from './styled/index.styled';

import styled from 'styled-components';
import { Colors, Devices } from '../Theme';

const PostEl = styled.article`
  background-color: ${Colors.Primary};
  color: ${Colors.Black};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  @media ${Devices.Laptop} {
    padding: 1rem 15%;
  }
`;
const SectionContainer = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 2rem;
  @media ${Devices.Laptop} {
    flex-direction: row;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex: 0.75rem;
  flex-direction: column;
  gap: 1rem;
`;
const ImageEl = styled.div`
    overflow: hidden;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  flex: 1;
`;

const AuthorContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 30px;
  margin-left: 6.875rem;
  span {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`;
const AvatarEl = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
const TimeLabel = styled.label`
  color: ${Colors.Gray};
  font-size: 0.9rem;
`;
const UsernameEl = styled.h3``;

const Title = styled.p`
  font-size: 1rem;
  display: inline-block;
  margin-right: 1rem;
  margin-left: 120px;
  max-width:400px;
`;

const Likes = styled.span`
margin-left: 6.875rem;
`;

const LikesEl = styled.span`padding:10px;`;

const Des = styled.div`
  white-space: pre-wrap;
`;

const Interact = styled.div`font-size: 2.4rem;
cursor: pointer;
color: #a89ec9;`;

const Share = styled.div`display: flex;
align-items: center;
gap:1.5rem;
  width:100%;
  padding:0 0 .5rem 0;

  color: #a89ec9;`;

const ShareLeft = styled.span`justify-content: start;
font-size: 2.4rem;
  cursor: pointer;
  color: #a89ec9;
  i:hover{
    color: #ee83e5;
  }`;

const ShareRight = styled.span`flex-grow:1;
text-align: right;
font-size: 2.4rem;
  cursor: pointer;
  color: #a89ec9;
  i:hover{
    color: #ee83e5;
  }`;


export default function Post({post}) {
	return (
		<PostEl>
			<Head>Post</Head>
			<SectionContainer>
				<LeftSection>
					<ImageEl>
						<Image src={post.mediaUrl} layout="responsive" width="1000px" height="1000px" />
					</ImageEl>
					<Interact>
						<Share>
							<ShareLeft><i><IoIosHeart /></i></ShareLeft>
							<ShareLeft><i><IoIosSend /></i></ShareLeft>
							<ShareRight><i><IoIosBookmark /></i></ShareRight>
						</Share>
					</Interact>
				</LeftSection>
				<RightSection>
					<AuthorContainer>
						<AvatarEl>
                            <Blockie seed={post.user.address} size={12.5} />
						</AvatarEl>
						<div style={{display: 'inline'}}>
							<TimeLabel>
                                <Moment fromNow>{post.createdAt}</Moment>
                            </TimeLabel>
							<UsernameEl>{post.user.username}</UsernameEl>
						</div>
						<TimeLabel>
                            <Moment format="D MMM YYYY" withTitle>
                                {post.createdAt}
                            </Moment>
                        </TimeLabel>
					</AuthorContainer>
					<div style={{display: 'inline'}}>
						<Title>{post.description}</Title>
					</div>
                    <Likes>
                        <LikesEl><BsHeart /> {post.likes}</LikesEl>
                        <LikesEl><BsFillEyeFill />0</LikesEl>
                    </Likes>
                    <Des>
                        {post.comments.map(comment => {
                            return <Comment comment={comment}/>;
                        })}
                        <AddComment />
                    </Des>
				</RightSection>
			</SectionContainer>
		</PostEl>
	);
}
