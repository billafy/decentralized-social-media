import React from "react";
import Asset from "../src/components/Asset";
import { Users } from "../src/Info";
import { NFTs } from "../src/Info";
import { useRouter } from "next/router";

export default function AssetPage() {
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
		<Asset
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
