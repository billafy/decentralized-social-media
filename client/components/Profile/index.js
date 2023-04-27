import Head from "next/head";
import Tabs from "../styled/Tabs.styled";
import { Button } from "@web3uikit/core";
import { Blockie } from "@web3uikit/web3";
import Edit from "./Edit";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostGrid } from "../styled/Grid.styled";
import Link from "next/link";
import NFTs from '../NFTs';
import Tab from "../styled/Tab.styled";
import Posts from "../Posts";
import axios from "axios";
import {ethers} from 'ethers';
import Moralis from 'moralis';
import addresses from "../../constants/addresses.json";
import marketplaceAbi from "../../constants/abi.json";
import { useRouter } from 'next/router'
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
    StatTitle,
    BidGrid,
    NftBid,
} from "./styled/index.styled";

const Profile = ({ user, posts, nfts, likes, biddedNfts }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        auth: { isLoggedIn, isLoading, userProfile },
    } = useSelector((state) => state);
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [profile, setProfile] = useState(user);

    const follow = async () => {
        try {
            const response = await axios.post(
                "/api/user/follow",
                { _id: profile._id },
                { withCredentials: true }
            );
            dispatch({
                type: "SET_PROFILE",
                payload: { userProfile: response.data.user },
            });
            setProfile(response.data.followingUser);
        } catch (err) {
            console.log(err);
        }
    };

    const unfollow = async () => {
        try {
            const response = await axios.put(
                "/api/user/unfollow",
                { _id: profile._id },
                { withCredentials: true }
            );
            dispatch({
                type: "SET_PROFILE",
                payload: { userProfile: response.data.user },
            });
            setProfile(response.data.followingUser);
        } catch (err) {
            console.log(err);
        }
    };

    const makePayment = async (nft) => {
        await Moralis.start({
            apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const marketplace = new ethers.Contract(
                addresses[process.env.NEXT_PUBLIC_CHAIN_ID],
                marketplaceAbi,
                signer
            );
            await marketplace.makePayment(nft.token_id, {value: nft.bid.amount});
            router.reload();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (profile.username === userProfile.username) setProfile(userProfile);
    }, [userProfile]);

    const tabs = [
        {
            id: 1,
            title: "Posts",
            content: posts.length ? (
                <PostGrid>
                    {posts.map((post, i) => {
                        return (
                            <Link
                                key={i}
                                href={{
                                    pathname: "/post",
                                    query: { id: post._id.toString() },
                                }}
                                passHref
                            >
                                <a>
                                    <Posts
                                        key={post._id.toString()}
                                        post={post}
                                    />
                                </a>
                            </Link>
                        );
                    })}
                </PostGrid>
            ) : (
                <Tab />
            ),
        },
        {
            id: 2,
            title: "NFTs",
            content: nfts.length ? (
                <PostGrid>
                    {nfts.map((nft, i) => {
                        if(!nft.metadata?.image) 
                            return <Fragment key={i}/>
                        return (
                            <Link
                                key={i}
                                href={{
                                    pathname: "/nft",
                                    query: { tokenId: nft.tokenId },
                                }}
                                passHref
                            >
                                <a>
									<NFTs
                                        key={nft.tokenId}
                                        nft={nft}
                                    />
                                </a>
                            </Link>
                        );
                    })}
                </PostGrid>
            ) : (
                <Tab />
            ),
        },
        {
            id: 3,
            title: "Bids",
            content: biddedNfts.length ? (
                <BidGrid>
                    {biddedNfts.map((nft, i) => {
                        if(!nft.metadata?.image) 
                            return <Fragment key={i}/>
                        return (
                            <NftBid key={i}>
                                <Link
                                    href={{
                                        pathname: "/nft",
                                        query: { tokenId: nft.token_id },
                                    }}
                                    passHref
                                >
                                    <img src={nft.metadata.image} alt='NFT'/>
                                </Link>
                                <div>
                                    <h5>#{nft.token_id} {nft.metadata.name}</h5>
                                    <b>{ethers.utils.formatEther(nft.bid.amount)} ETH</b>
                                    {nft.bid.status === 'Accepted'
                                        ?
                                        <Button text='Pay' onClick={() => makePayment(nft)}/>
                                        :
                                        <Button text='Pending' disabled={true}/>
                                    }
                                    <span>{nft.bid.status === 'Accepted' && 'Bid Accepted'}</span>
                                </div>
                            </NftBid>
                        );
                    })}
                </BidGrid>
            ) : (
                <Tab />
            ),
        },
        { id: 4, title: "Liked", content: <Tab /> },
    ];

    if (isLoading)
        return (
            <p
                style={{
                    textAlign: "center",
                    margin: "3rem 0px",
                    fontSize: "3rem",
                }}
            >
                Loading...
            </p>
        );
    return (
        <ProfileEl>
            <Head>
                <title>ChainSpace - Profile</title>
            </Head>
            <Cover>
                <Info>
                    <Avatar>
                        <Blockie seed={profile.address} size={40} />
                    </Avatar>
                </Info>
                <Name>
                    {profile.username}
                    {profile._id === userProfile._id && (
                        <Button
                            onClick={() => setIsEditModalOpen(true)}
                            text="✏️"
                        />
                    )}
                </Name>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "1.5rem 0px",
                        gap: "0.5rem",
                    }}
                >
                    {isLoggedIn &&
                        profile._id?.toString() !== userProfile._id?.toString() &&
                        (userProfile.following.includes(profile._id) ? (
                            <Button onClick={unfollow} text="Following" />
                        ) : (
                            <Button onClick={follow} text="Follow" />
                        ))}
                </div>
                {isEditModalOpen && (
                    <Edit onCancel={() => setIsEditModalOpen(false)} />
                )}
                {isEditModalOpen && (
                    <Backdrop onCancel={() => setIsEditModalOpen(false)} />
                )}
                {isFollowersModalOpen && (
                    <Modal
                        list={profile.followers}
                        onCancel={() => setIsFollowersModalOpen(false)}
                        title="Followers"
                    />
                )}
                {isFollowersModalOpen && (
                    <Backdrop onCancel={() => setIsFollowersModalOpen(false)} />
                )}
                {isFollowingModalOpen && (
                    <Modal
                        list={profile.following}
                        onCancel={() => setIsFollowingModalOpen(false)}
                        title="Following"
                    />
                )}
                {isFollowingModalOpen && (
                    <Backdrop onCancel={() => setIsFollowingModalOpen(false)} />
                )}
                <Bio>{profile.aboutMe}</Bio>
                <Stats>
                    <StatItem>
                        <StatTitle>Likes</StatTitle>
                        <StatValue>{likes}</StatValue>
                    </StatItem>
                    <StatItem>
                        <StatTitle>Total Earnings</StatTitle>
                        <StatValue>{profile.earnings} ETH</StatValue>
                    </StatItem>
                    <StatItem>
                        <StatTitle>Current Balance</StatTitle>
                        <StatValue>{profile.balance} ETH</StatValue>
                    </StatItem>
                    <StatItem>
                        <StatTitle>
                            <a onClick={() => setIsFollowersModalOpen(true)}>
                                Followers
                            </a>
                        </StatTitle>
                        <StatValue>{profile.followers?.length}</StatValue>
                    </StatItem>
                    <StatItem>
                        <StatTitle>
                            <a onClick={() => setIsFollowingModalOpen(true)}>
                                Following
                            </a>
                        </StatTitle>
                        <StatValue>{profile.following?.length}</StatValue>
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
