import Profile from "../components/Profile";
import Moralis from "moralis";
import addresses from '../constants/addresses.json'

const ProfilePage = ({ user, posts, nfts }) => {
    return <Profile {...{user, posts, nfts}} />;
};

export async function getServerSideProps({ query }) {
    const mongoose = (await import("mongoose")).default;
    const UserSchema = (await import("../models/User")).default;
    const PostSchema = (await import("../models/Post")).default;
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
            { updatedAt: 0, __v: 0, comments: 0, likes: 0, description: 0 }
        )
            .populate("user", {
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
                profileId: 0,
            })
            .sort([["createdAt", -1]])
            .exec();

        await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

        const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address: user.address,
            chain: process.env.NEXT_PUBLIC_CHAIN_ID,
        });

        const nfts = response.result.filter(nft => nft.tokenAddress._value === addresses[process.env.NEXT_PUBLIC_CHAIN_ID]);
        
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                posts: JSON.parse(JSON.stringify(posts)),
                nfts: JSON.parse(JSON.stringify(nfts)),
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
