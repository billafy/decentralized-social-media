import { Schema, model, models } from "mongoose";

const nftSchema: Schema = new Schema({
    tokenId: { type: Number, required: true },
    owner: { type: String, required: true },
    bids: {
        type: [
            {
                bidder: { type: String, required: true },
                amount: { type: Number, required: true },
                status: {
                    type: String,
                    required: true,
                    enum: ["Submitted", "Accepted", "Rejected"],
                    default: "Submitted",
                },
            },
        ],
        default: [],
    },
});

const Nft = models.Nft || model("Nft", nftSchema);

export default Nft;
