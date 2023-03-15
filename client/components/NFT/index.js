import {useState} from 'react';
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoMdShareAlt } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { Blockie } from "@web3uikit/web3";
import Head from "next/head";
import EditionSelector from "./EditionSelector";
import BidSticker from "./BidSticker";
import addresses from "../../constants/addresses.json";
import { useSelector } from "react-redux";
import Link from 'next/link';
import { Button } from "@web3uikit/core";
import {ethers} from 'ethers';
import Moralis from "moralis";
import marketplaceAbi from "../../constants/abi.json";
import {
    NFTEl,
    SectionContainer,
    LeftSection,
    ImageEl,
    ChainLink,
    RightSection,
    TopBtns,
    ShareBtn,
    MoreBtn,
    AuthorContainer,
    AvatarEl,
    CreatorLabel,
    UsernameEl,
    Title,
    MarketPlace,
    Des,
    TagContainer,
    Tag,
    BidList,
} from "./styled/index.styled";

export default function NFT({ nftOwner, nft, postId }) {
    const [currentNft, setCurrentNft] = useState(nft);
    const {
        auth: { userProfile },
    } = useSelector((state) => state);

    const acceptBid = async (bidder) => {
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
            await marketplace.acceptBid(currentNft.token_id, bidder);
            const bids = currentNft.bids.map(bid => {
                if(bid.bidder.toLowerCase() === bidder.toLowerCase()) 
                    return {...bid, status: 'Accepted'};
                return bid;
            })
            setCurrentNft({...currentNft, bids})
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <NFTEl>
            <Head>NFT</Head>
            <SectionContainer>
                <LeftSection>
                    <ImageEl>
                        <img src={currentNft.metadata.image} alt='NFT'/>
                    </ImageEl>
                </LeftSection>
                <RightSection>
                    <AuthorContainer>
                        <AvatarEl>
                            <Blockie seed={currentNft.owner_of} size={10} />
                        </AvatarEl>
                        <span>
                            <CreatorLabel>Owner</CreatorLabel>
                            <UsernameEl>
                                <Link
                                    href={{
                                        pathname: "/profile",
                                        query: {
                                            id: nftOwner._id.toString(),
                                        },
                                    }}
                                >
                                    {nftOwner.username}
                                </Link>
                            </UsernameEl>
                        </span>
                        <MoreBtn>
                            <BsThreeDots />
                        </MoreBtn>
                    </AuthorContainer>
                    <span>
                        <Title>{currentNft.metadata.name}</Title>
                        <MarketPlace>{currentNft.symbol}</MarketPlace>
                    </span>
                    <Des>{currentNft.metadata.description}</Des>
                    <TagContainer>
                        {currentNft.metadata.attributes?.map((tag, i) => {
                            return (
                                <Tag key={i}>{tag.value}</Tag>
                            );
                        })}
                    </TagContainer>
                    <TopBtns>
                        <ShareBtn>
                            <IoMdShareAlt />
                            Share
                        </ShareBtn>
                    </TopBtns>
                    <EditionSelector
                        edition={currentNft.token_id}
                        mintDate={currentNft.last_token_uri_sync}
                    />
                    <a
                        href={`https://testnets.opensea.io/assets/goerli/${
                            addresses[process.env.NEXT_PUBLIC_CHAIN_ID]
                        }/${currentNft.token_id}`}
                        target="_blank"
                    >
                        <ChainLink>
                            View on OpenSea <HiOutlineExternalLink />
                        </ChainLink>
                    </a>
                    <a
                        href={`https://goerli.etherscan.io/token/${
                            addresses[process.env.NEXT_PUBLIC_CHAIN_ID]
                        }?a=${currentNft.token_id}#inventory`}
                        target="_blank"
                    >
                        <ChainLink>
                            View on Etherscan <HiOutlineExternalLink />
                        </ChainLink>
                    </a>
                    <BidList>
                        {currentNft.bids.length > 0 && <h3>Bids</h3>}
                        {currentNft.bids.map(bid => {
                            return (
                                <div>
                                    <Blockie seed={bid.bidder} size={7.5} />
                                    <p>{bid.user.username}</p>
                                    <b>{ethers.utils.formatEther(bid.amount)} ETH</b>
                                    {bid.status === 'Submitted'
                                        ?
                                        <Button text='Accept' onClick={() => acceptBid(bid.bidder)}/>
                                        :
                                        <Button text='Accepted' disabled={true}/>
                                    }
                                </div>
                            );
                        })}
                    </BidList>
                </RightSection>
            </SectionContainer>
            {currentNft.owner_of.toLowerCase() !== userProfile.address?.toLowerCase() && <BidSticker nft={nft}/>}
        </NFTEl>
    );
}
