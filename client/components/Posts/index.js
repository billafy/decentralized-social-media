import styles from '../../styles/Posts.module.css';
import { classLister } from '../../utils';

const classes = classLister(styles);

const Posts = ({ post }) => {
	return (
		<div className={classes('card-wrapper', 'flex-container')}>
			<div className={classes('card-img-container')}>
				<img className={classes('card-img')} src={post.mediaUrl} alt="" />
			</div>
		</div>
	);
};

export default Posts;
