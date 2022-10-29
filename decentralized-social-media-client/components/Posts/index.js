import styles from '../../styles/Posts.module.css';
import { classLister } from '../../utils';
import { Blockie } from '@web3uikit/web3';
import Moment from 'react-moment';

const classes = classLister(styles);

const Posts = ({ post }) => {
	return (
		<div className={classes('card-wrapper', 'flex-container')}>
			<div className={classes('card-header', 'grid')}>
				<div className={classes('header-img-container', 'flex-container')}>
					<Blockie seed={post.user.address} size={10} />
				</div>
				<span className={classes('card-title')}>
					{post.user.username}
				</span>
				<span className={classes('card-subtitle')}>
					<Moment fromNow>{post.createdAt}</Moment>
				</span>
				<div className={classes('card-opt-btn', 'flex-container')}><i className="bi bi-three-dots" /></div>
			</div>
			<div className={classes('card-img-container')}>
				<img className={classes('card-img')} src={post.mediaUrl} alt="" />
			</div>
		</div>
	);
};

export default Posts;
