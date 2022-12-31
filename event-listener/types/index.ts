import { BigNumber } from "@moralisweb3/core";

export interface PostMinted {
    tokenId: BigNumber,
    owner: string,
}

export interface BidSubmitted {
    tokenId: BigNumber,
    bidder: string,
    amount: BigNumber
}

export interface BidAccepted {
    tokenId: BigNumber,
    bidder: string
}

export interface Withdrawn {
    user: string,
    amount: BigNumber
}

export interface NftTransferred {
    tokenId: BigNumber,
    from: string,
    to: string,
    amount: BigNumber
}