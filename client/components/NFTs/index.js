import {Fragment} from 'react';
import styles from '../../styles/Posts.module.css';
import { classLister } from '../../utils';

const classes = classLister(styles);

const NFTs = ({ nft }) => {
	if(!nft.metadata) 
		return <Fragment/>
	return (
		<div className={classes('card-wrapper', 'flex-container')}>
			<div className={classes('card-header', 'grid')}>
				<span className={classes('card-title')}>
					#{nft.tokenId} {nft.metadata.name}
				</span>
				<div className={classes('card-opt-btn', 'flex-container')}><i className="bi bi-three-dots" /></div>
			</div>
			<div className={classes('card-img-container')}>
				<img className={classes('card-img')} src={nft.metadata.image} alt="" />
			</div>
		</div>
	);
};

export default NFTs;
