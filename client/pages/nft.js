import React from "react";
import NFT from "../components/NFT";
import axios from "axios";
import addresses from "../constants/addresses.json";

const NFTPage = ({ nft, nftOwner, postId }) => {
    return <NFT nft={nft} nftOwner={nftOwner} postId={postId}/>;
};

export async function getServerSideProps({ query }) {
    const UserSchema = (await import("../models/User")).default;
    const PostSchema = (await import("../models/Post")).default;
    const CommentSchema = (await import("../models/Comment")).default;

    try {
        const response = await axios.get(
            `https://deep-index.moralis.io/api/v2/nft/${
                addresses[process.env.NEXT_PUBLIC_CHAIN_ID]
            }/${query.tokenId}`,
            {
                params: {
                    chain: "goerli",
                    format: "decimal",
                    normalizeMetadata: "false",
                },
                headers: {
                    accept: "application/json",
                    "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY,
                },
            }
        );

        const nftOwner = await UserSchema.findOne({'address': {'$regex': response.data.owner_of, '$options':'i'}}, {
            updatedAt: 0,
            __v: 0,
            profileId: 0,
        }).exec();

        const post = await PostSchema.findOne({mediaUrl: JSON.parse(response.data.metadata).image, user: nftOwner._id}, {_id: 1});

        return {
            props: {
                nftOwner: JSON.parse(JSON.stringify(nftOwner)),
                nft: JSON.parse(
                    JSON.stringify({
                        ...response.data,
                        metadata: JSON.parse(response.data.metadata),
                    })
                ),
                postId: post._id.toString(),
            },
        };
    } catch (err) {
        console.log(err);
        return {
            notFound: true,
        };
    }
}

export default NFTPage;
