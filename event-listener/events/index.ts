import Moralis from "moralis";
import { EventEmitter } from "events";
import {
    PostMinted,
    BidSubmitted,
    BidAccepted,
    Withdrawn,
    NftTransferred,
} from "../types";
import UserSchema from "../models/User";
import NftSchema from "../models/Nft";
import { getNumber } from "../utils";

const eventEmitter = new EventEmitter();

eventEmitter.on("PostMinted", async (body) => {
    const eventBody = Moralis.Streams.parsedLogs<PostMinted>(body)[0];
    const nft = new NftSchema({
        tokenId: getNumber(eventBody.tokenId),
        owner: eventBody.owner.toLowerCase(),
    });
    await nft.save();
});

eventEmitter.on("BidSubmitted", async (body) => {
    const eventBody = Moralis.Streams.parsedLogs<BidSubmitted>(body)[0];
    const nft = await NftSchema.findOne({
        tokenId: getNumber(eventBody.tokenId),
    });
    nft.bids.push({
        bidder: eventBody.bidder.toLowerCase(),
        amount: getNumber(eventBody.amount),
    });
    await nft.save();
});

eventEmitter.on("BidAccepted", async (body) => {
    const eventBody = Moralis.Streams.parsedLogs<BidAccepted>(body)[0];
    const nft = await NftSchema.findOne({
        tokenId: getNumber(eventBody.tokenId),
    });
    for (let i = 0; i < nft.bids.length; ++i) {
        if (nft.bids[i].bidder.toLowerCase() === eventBody.bidder.toLowerCase()) {
            nft.bids[i].status = "Accepted";
            break;
        }
    }
    nft.markModified("bids");
    await nft.save();
});

eventEmitter.on("Withdrawn", async (body) => {
    const eventBody = Moralis.Streams.parsedLogs<Withdrawn>(body)[0];
});

eventEmitter.on("NftTransferred", async (body) => {
    const eventBody = Moralis.Streams.parsedLogs<NftTransferred>(body)[0];
    const nft = await NftSchema.findOne({
        tokenId: getNumber(eventBody.tokenId),
    }).exec();
    nft.owner = eventBody.to;
    nft.bids = [];
    nft.markModified("bids");
    try {
        const user = await UserSchema.findOne({address: eventBody.from.toString().toLowerCase()});
        const bid = nft.bids.find((bid: { bidder: string; amount: number }) => bid.bidder.toLowerCase() === eventBody.to.toString().toLowerCase());
        user.earnings += Number(bid.amount);
        await user.save();
    } catch {}
    await nft.save();
});

export default eventEmitter;
