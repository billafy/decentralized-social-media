import { useState } from "react";
import {
    MintContainer,
    MintHeading,
    MintInput,
    AddedTags,
    Tag,
    MintButton,
    CloseButton,
} from "./styled/Mint.styled";
import { Button } from "@web3uikit/core";
import { MdAdd, MdClose } from "react-icons/md";
import marketplaceAbi from "../../constants/abi.json";
import addresses from "../../constants/addresses.json";
import Moralis from "moralis";
import { ethers } from "ethers";

const Mint = ({ closeMintNft, post }) => {
    const [nftName, setNftName] = useState("");
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const addTag = () => {
        if (newTag && !tags.includes(newTag) && tags.length < 10) {
            setTags([...tags, newTag]);
            setNewTag("");
        }
    };

    const removeTag = (tag) => {
        const newTags = tags.filter((_tag) => _tag !== tag);
        setTags([...newTags]);
    };

    const mintNft = async () => {
        if(!nftName) 
            return;
        await Moralis.start({
            apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });
        try {
            const ipfsResponse = await Moralis.EvmApi.ipfs.uploadFolder({
                abi: [
                    {
                        path: `${post._id}.json`,
                        content: {
                            name: nftName,
                            description: post.description,
                            image: post.mediaUrl,
                            attributes: tags.map((tag) => ({ value: tag })),
                        },
                    },
                ],
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const marketplace = new ethers.Contract(
                addresses[process.env.NEXT_PUBLIC_CHAIN_ID],
                marketplaceAbi,
                signer
            );
            const mintFee = await marketplace.getMintFee();
            await marketplace.mintPost(ipfsResponse.data[0].path, {value: ethers.utils.parseEther(mintFee.toString())});
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <MintContainer>
            <CloseButton>
                <MdClose onClick={closeMintNft}/>
            </CloseButton>
            <MintHeading>Mint NFT</MintHeading>
            <MintInput>
                <label>NFT Name</label>
                <input
                    type="text"
                    value={nftName}
                    onChange={(e) => setNftName(e.target.value)}
                />
            </MintInput>
            <MintInput>
                <label>Add Tags (upto 10)</label>
                <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                />
                <button onClick={addTag}>
                    <MdAdd />
                </button>
            </MintInput>
            <AddedTags>
                {tags.map((tag) => {
                    return (
                        <Tag key={tag}>
                            <p>{tag}</p>
                            <span onClick={() => removeTag(tag)}>
                                <MdClose/>
                            </span>
                        </Tag>
                    );
                })}
            </AddedTags>
            <p style={{fontSize: '0.9rem'}}>Minting Fee : 0.0001 ETH</p>
            <MintButton>
                <Button onClick={mintNft} text="Mint" disabled={!nftName} />
            </MintButton>
        </MintContainer>
    );
};

export default Mint;
