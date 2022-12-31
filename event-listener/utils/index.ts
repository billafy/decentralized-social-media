import { BigNumber } from "@moralisweb3/core";

export const getEventNameFromHash = (topic0: string) => {
    switch(topic0) {
        case "0x977d73d9fed460f9a96c26dd1d1cfd43a7b999de22fa4f31cf2ccda72879b161":
            return "PostMinted";
        case "0x0b7e3c2d0983fdcbfa4fcb08da6f6d862e83ce066e7bbc783163da9753a829aa":
            return "BidAccepted";
        case "0x3cc29b686691e10c451a0cf17277448d0d7424574ed61e940ab1f7ce5e33c24c":
            return "NftTransferred";
        case "0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5":
            return "Withdrawn";
        case "0x177554f051f4aa1f0d0310334854b429baeecdb5a96bc329a26fd0cb7c8a7be3":
            return "BidSubmitted";
        default: 
            return "";
    }
};

export const getNumber = (num: BigNumber) => {
    return Number(num.toString());
};