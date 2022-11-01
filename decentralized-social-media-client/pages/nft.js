import React from 'react';
import NFT from '../components/NFT';
import { Users } from '../constants/info';
import { NFTs } from '../constants/info';
import { useRouter } from 'next/router';

export default function NFTPage() {
	const router = useRouter();
	const id = router.query.id - 1;
	const title = NFTs[id].Title;
	const imgurl = NFTs[id].ImageUrl;
	const creator = NFTs[id].Author;
	const likes = NFTs[id].likes;
	const views = NFTs[id].views;
	const avi = NFTs[id].Avatar;
	const editions = NFTs[id].Edition;
	const desc = NFTs[id].Description;

	return (
		<NFT
			title={title}
			imgurl={imgurl}
			creator={creator}
			likes={likes}
			views={views}
			cimg={avi}
			desc={desc}
			edition={editions}
		/>
	);
}
