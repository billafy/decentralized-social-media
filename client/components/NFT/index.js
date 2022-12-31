import { HiOutlineExternalLink } from "react-icons/hi";
import { IoMdShareAlt } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { Blockie } from "@web3uikit/web3";
import Tab from "../styled/Tab.styled";
import Tabs from "../styled/Tabs.styled";
import Head from "next/head";
import EditionSelector from "./EditionSelector";
import OwnershipItem from "./OwnershipItem";
import BidSticker from "./BidSticker";
import addresses from "../../constants/addresses.json";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import {
    NFTEl,
    SectionContainer,
    LeftSection,
    ImageEl,
    ChainLink,
    RightSection,
    TopBtns,
    LikesBtn,
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
} from "./styled/index.styled";

const AllTabs = [
    { Id: 1, Title: "Ownership", Content: <OwnershipItem /> },
    { Id: 2, Title: "History", Content: <Tab /> },
    { Id: 3, Title: "Bids", Content: <Tab /> },
    { Id: 4, Title: "Offers", Content: <Tab /> },
];

export default function NFT({ nftOwner, nft, postId }) {
    const {
        auth: { userProfile },
    } = useSelector((state) => state);

    return (
        <NFTEl>
            <Head>NFT</Head>
            <SectionContainer>
                <LeftSection>
                    <ImageEl>
                        <img src={nft.metadata.image} alt='NFT'/>
                    </ImageEl>
                </LeftSection>
                <RightSection>
                    <AuthorContainer>
                        <AvatarEl>
                            <Blockie seed={nft.owner_of} size={10} />
                        </AvatarEl>
                        <span>
                            <CreatorLabel>Creator</CreatorLabel>
                            <UsernameEl>{nftOwner.username}</UsernameEl>
                        </span>
                        <MoreBtn>
                            <BsThreeDots />
                        </MoreBtn>
                    </AuthorContainer>
                    <span>
                        <Title>{nft.metadata.name}</Title>
                        <MarketPlace>{nft.symbol}</MarketPlace>
                    </span>
                    <Des>{nft.metadata.description}</Des>
                    <TagContainer>
                        {nft.metadata.attributes?.map((tag, i) => {
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
                        edition={nft.token_id}
                        mintDate={nft.last_token_uri_sync}
                    />
                    <a
                        href={`https://testnets.opensea.io/assets/goerli/${
                            addresses[process.env.NEXT_PUBLIC_CHAIN_ID]
                        }/${nft.token_id}`}
                        target="_blank"
                    >
                        <ChainLink>
                            View on OpenSea <HiOutlineExternalLink />
                        </ChainLink>
                    </a>
                    <a
                        href={`https://goerli.etherscan.io/token/${
                            addresses[process.env.NEXT_PUBLIC_CHAIN_ID]
                        }?a=${nft.token_id}#inventory`}
                        target="_blank"
                    >
                        <ChainLink>
                            View on Etherscan <HiOutlineExternalLink />
                        </ChainLink>
                    </a>
                    <Tabs mt="1rem" data={AllTabs} />
                </RightSection>
            </SectionContainer>
            {nft.owner_of.toLowerCase() !== userProfile.address?.toLowerCase() && (
                <BidSticker
                    title={nft.metadata.name}
                    src={nft.metadata.image}
                    edition={nft.token_id}
                />
            )}
        </NFTEl>
    );
}
