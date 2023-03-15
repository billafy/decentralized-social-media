import Profile from "../components/Profile";
import Moralis from "moralis";
import axios from "axios";
import addresses from '../constants/addresses.json'

const ProfilePage = ({ user, posts, nfts, biddedNfts, likes }) => {
    return <Profile {...{user, posts, nfts, biddedNfts, likes}} />;
};

export async function getServerSideProps({ query }) {
    const mongoose = (await import("mongoose")).default;
    const UserSchema = (await import("../models/User")).default;
    const PostSchema = (await import("../models/Post")).default;
    const NftSchema = (await import("../models/Nft")).default;
    const CommentSchema = (await import("../models/Comment")).default;

    await mongoose.connect(process.env.MONGO_URI);

    try {
        const user = await UserSchema.findById(query.id, {
            updatedAt: 0,
            __v: 0,
            profileId: 0,
        })
            .populate("followers", ["username", "address"])
            .populate("following", ["username", "address"])
            .exec();
        if (!user) throw "Not Found";
        const posts = await PostSchema.find(
            { user: user._id },
            { updatedAt: 0, __v: 0, comments: 0, description: 0 }
        )
            .populate("user", {
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
                profileId: 0,
            })
            .sort([["createdAt", -1]])
            .exec();
        
        let likes = 0;
        for(let i = 0; i < posts.length; ++i) 
            likes += posts[i].likes.length;

        await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

        const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address: user.address,
            chain: process.env.NEXT_PUBLIC_CHAIN_ID,
        });

        const nfts = response.result.filter(nft => (nft.tokenAddress._value === addresses[process.env.NEXT_PUBLIC_CHAIN_ID] && nft.metadata));

        for(let i = 0; i < nfts.length; ++i) {
            const nft = await NftSchema.findOne({tokenId: nfts[i]._data.tokenId});
            if(nft) 
                nfts[i]._data.bids = nft.bids;
        }

        const bids = await NftSchema.find({'bids.bidder': user.address});
        const biddedNfts = [];
        for(let i = 0; i < bids.length; ++i) {
            const response = await axios.get(
                `https://deep-index.moralis.io/api/v2/nft/${
                    addresses[process.env.NEXT_PUBLIC_CHAIN_ID]
                }/${bids[i].tokenId}`,
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
            biddedNfts.push({
                ...response.data,
                bid: bids[i]._doc.bids.find(bid => bid.bidder.toLowerCase() === user.address.toLowerCase()),
                metadata: JSON.parse(response.data.metadata),
            });
        }
        
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                posts: JSON.parse(JSON.stringify(posts)),
                nfts: JSON.parse(JSON.stringify(nfts)),
                biddedNfts: JSON.parse(JSON.stringify(biddedNfts)),
                likes,
            },
        };
    } catch (err) {
        console.log(err);
        return {
            notFound: true,
        };
    }
}

export default ProfilePage;
