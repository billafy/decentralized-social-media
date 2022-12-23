import React from "react";
import NFT from "../components/NFT";
import axios from "axios";
import addresses from "../constants/addresses.json";

const NFTPage = ({ nft }) => {
    return <NFT nft={nft} />;
};

export async function getServerSideProps({ query }) {
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

        return {
            props: {
                nftOwner: JSON.parse(JSON.stringify({})),
                nft: JSON.parse(
                    JSON.stringify({
                        ...response.data,
                        metadata: JSON.parse(response.data.metadata),
                    })
                ),
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
