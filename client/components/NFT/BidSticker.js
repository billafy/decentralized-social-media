import { Fragment, useState } from "react";
import Image from "next/image";
import Moralis from "moralis";
import marketplaceAbi from "../../constants/abi.json";
import addresses from "../../constants/addresses.json";
import { ethers } from "ethers";
import {useSelector} from 'react-redux';
import {
    BidStickyEl, 
    LeftSection, 
    ThumbEl, 
    Info,
    EditionEl,
    Title,
    RightSection,
    PlaceBidBtn,
    TextEl,
} from './styled/BidSticker.styled';

export default function BidSticker({nft}) {
    const { userProfile } = useSelector(state => state.auth);
    const [bidAmount, setBidAmount] = useState('');
    const bid = nft.bids.find(bid => bid.bidder.toLowerCase() === userProfile.address?.toLowerCase());

    const placeBid = async () => {
        if(!bidAmount?.toString()) 
            return;
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
            await marketplace.submitBid(nft.token_id, ethers.utils.parseEther(bidAmount.toString()));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <BidStickyEl>
            <LeftSection>
                <ThumbEl>
                    <Image src={nft.metadata.image} width="80px" height="80px" />
                </ThumbEl>
                <Info>
                    <EditionEl>#{nft.token_id}</EditionEl>
                    <Title>{nft.metadata.name}</Title>
                </Info>
            </LeftSection>
            <RightSection>
                {bid
                    ?
                    <PlaceBidBtn>
                        Bid Placed - {ethers.utils.formatEther(bid.amount)} ETH
                    </PlaceBidBtn>
                    :
                    <Fragment>
                        <input type='number' placeholder='Enter ETH amount' value={bidAmount} onChange={(e) => setBidAmount(e.target.value)}/>
                        <PlaceBidBtn onClick={placeBid}>Place a Bid</PlaceBidBtn>
                    </Fragment>
                    }
                <TextEl>
                    A 10% royalty goes to the creator for future resale
                </TextEl>
            </RightSection>
        </BidStickyEl>
    );
}
