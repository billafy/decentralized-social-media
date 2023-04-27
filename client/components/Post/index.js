import { useState } from "react";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import Comment from "./Comment";
import Head from "next/head";
import AddComment from "./AddComment";
import { Blockie } from "@web3uikit/web3";
import { Button } from "@web3uikit/core";
import Moment from "react-moment";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";
import Mint from './Mint';
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
} from "./styled/index.styled";

export default function Post({ post }) {
    const [currentPost, setCurrentPost] = useState(post);
    const { userProfile } = useSelector((state) => state.auth);
    const [showMintNft, setShowMintNft] = useState(false);

    const likeToggle = async () => {
        try {
            const response = await axios.put(
                `/api/post/${post._id.toString()}/likeToggle`
            );
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
                        <img src={currentPost.mediaUrl} alt='Post'/>
                    </ImageEl>
                    <Interact>
                        <Share>
                            <ShareLeft>
                                {currentPost.likes.includes(userProfile._id) ? (
                                    <AiFillHeart
                                        color="#DC143C"
                                        onClick={likeToggle}
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        color="#DC143C"
                                        onClick={likeToggle}
                                    />
                                )}
                            </ShareLeft>
                            <ShareLeft>
                                <GoComment color="#000000" />
                            </ShareLeft>
                        </Share>
                    </Interact>
                    {currentPost.user._id === userProfile._id &&
                        !currentPost.isMinted && (
                            <Button
                                text="Mint NFT"
                                onClick={() => setShowMintNft(true)}
                            />
                        )}
                </LeftSection>
                <RightSection>
                    <AuthorContainer>
                        <AvatarEl>
                            <Blockie
                                seed={currentPost.user.address}
                                size={12.5}
                            />
                        </AvatarEl>
                        <div style={{ display: "inline" }}>
                            <UsernameEl>
                                <Link
                                    href={{
                                        pathname: "/profile",
                                        query: {
                                            id: currentPost.user._id.toString(),
                                        },
                                    }}
                                    passHref
                                >
                                    {currentPost.user.username}
                                </Link>
                            </UsernameEl>
                            <TimeLabel>
                                <Moment fromNow>{currentPost.createdAt}</Moment>{" "}
                                -{" "}
                                <Moment format="D MMM YYYY" withTitle>
                                    {currentPost.createdAt}
                                </Moment>
                            </TimeLabel>
                        </div>
                    </AuthorContainer>
                    <div style={{ display: "inline" }}>
                        <Title>{currentPost.description}</Title>
                    </div>
                    <Likes>
                        <LikesEl>
                            {currentPost.likes.includes(userProfile._id) ? (
                                <AiFillHeart color="#DC143C" />
                            ) : (
                                <AiOutlineHeart color="#DC143C" />
                            )}{" "}
                            {currentPost.likes.length}
                        </LikesEl>
                        <LikesEl>
                            <GoComment /> {currentPost.comments.length}
                        </LikesEl>
                    </Likes>
                    <Des>
                        <AddComment post={currentPost} setPost={currentPost} />
                        {currentPost.comments.map((comment) => {
                            return <Comment comment={comment} />;
                        })}
                    </Des>
                </RightSection>
            </SectionContainer>
            {showMintNft && <Mint post={currentPost} closeMintNft={() => setShowMintNft(false)}/>}
        </PostEl>
    );
}
