import styled from "styled-components";
import Image from "next/image";
import { Colors, Devices } from "./Theme";
import {IoIosHeart,IoIosSend,IoIosBookmark,IoIosHappy} from "react-icons/io";
import { BsHeart, BsFillEyeFill, BsThreeDots } from "react-icons/bs";
import Comment from "./Comment"
import Head from "next/head";
import { PostData } from "../constants/info";
import Addcomment from "./Addcomment";


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
  flex-direction: column;
  @media ${Devices.Laptop} {
    flex-direction: row;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex: 0.7rem;
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
  flex: 0.95;
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
  overflow: hidden;
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

const Likes= styled.span`
margin-left: 6.875rem;
`

const LikesEl = styled.span`padding:10px;`


const Des = styled.p`
  white-space: pre-wrap;
`;


const Interact = styled.div`font-size: 2.4rem;
cursor: pointer;
color: #a89ec9;`

const Share = styled.div`display: flex;
align-items: center;
gap:1.5rem;
  width:100%;
  padding:0 0 .5rem 0;
  
  color: #a89ec9;`

const ShareLeft = styled.span`justify-content: start;
font-size: 2.4rem;
  cursor: pointer;
  color: #a89ec9;
  i:hover{
    color: #ee83e5;
  }`

const ShareRight = styled.span`flex-grow:1;
text-align: right;
font-size: 2.4rem;
  cursor: pointer;
  color: #a89ec9;
  i:hover{
    color: #ee83e5;
  }`

export default function Post(props) {
  const commentData = PostData[props.id].Comments;
  return (
    <PostEl>
      <Head>Post</Head>
      <SectionContainer>
        <LeftSection>
          <ImageEl>
            <Image
              src={props.img}
              layout="responsive"
              width="1000px"
              height="1000px"
            />
          </ImageEl>
          <Interact>
        <Share> 
        <ShareLeft><i><IoIosHeart/></i></ShareLeft>
        <ShareLeft><i><IoIosSend/></i></ShareLeft>
        <ShareRight><i><IoIosBookmark/></i></ShareRight>
        </Share>
        </Interact>
        </LeftSection>
        <RightSection>
          <AuthorContainer>
            <AvatarEl>
              <Image src={props.avatar} width="50" height="50" />
            </AvatarEl>
            <span>
              <TimeLabel>5m ago</TimeLabel>
              <UsernameEl>{props.author}</UsernameEl>
            </span>
            <TimeLabel>29th Aug 12:00</TimeLabel>
          </AuthorContainer>
          <span>
            <Title>{props.caption}</Title>
          </span>
          <Likes>
            <LikesEl><BsHeart />  {props.likes}</LikesEl>
            <LikesEl><BsFillEyeFill />  {props.views}</LikesEl>
          
          
          </Likes>
          <Des>
            {commentData.map((com) => {
            return(<Comment  comment={com.Comment} auth={com.Author} avi={com.Avatar}/>);
          })
          }
            
            <Addcomment/>
          </Des>

        </RightSection>
      </SectionContainer>
    </PostEl>
  );
}
