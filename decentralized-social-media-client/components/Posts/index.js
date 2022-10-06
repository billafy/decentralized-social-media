import React from 'react';
import styles from '../../styles/Posts.module.css';
import { IoIosHeart, IoIosSend, IoIosBookmark, IoIosHappy } from 'react-icons/io';
import {classLister} from '../../utils';

const classes = classLister(styles);

const Posts = ({item}) => {
	const {
		Id,
		PostImage,
		Avatar,
		Author,
	} = item;
	return (
		<div className={classes('card-wrapper', 'flex-container')}>
			<div className={classes('card-header', 'grid')}>
				<div className={classes('header-img-container', 'flex-container')}>
					<img className={classes('card-header-img')} src={Avatar} alt="" />
				</div>
				<span className={classes('card-title')}>
					{Author}
				</span>

				<span className={classes('card-subtitle')}>15m ago</span>
				<div className={classes('card-opt-btn', 'flex-container')}><i className="bi bi-three-dots" /></div>
			</div>
			<div className={classes('card-img-container')}>
				<img className={classes('card-img')} src={PostImage} alt="" />
			</div>
		</div>
	);
}

export default Posts;

/* <div className={classes('card-data','flex-container')}>
<div className={classes('card-icons','flex-container')}>
<span className={classes('card-icon','card-icon-left')}><i><IoIosHeart/></i></span>
<span className={classes('card-icon','card-icon-left')}><i><IoIosSend/></i></span>
<span className={classes('card-icon','card-icon-right')}><i><IoIosBookmark/></i></span>
</div>
<span className={classes('bold','card-text')}>701 Likes</span>
<span className={classes('card-text')}><span className={classes('bold','title-margin')}>Lorem, ipsum.</span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, nesciunt. Lorem, ipsum dolor.</span>
<span className={classes('card-text','comments-btn')}>See more comments</span>
<span className={classes('card-time')}></span>
<div className={classes('add-comment-container','flex-container')}>
<span className={classes('card-icon')}><i><IoIosHappy/></i></span>
<div className={classes('comment-container')}>
<input className={classes('comment-input')} type="text" placeholder="Add a comment...."/>
</div>

<a href="#" className={classes('publish')} >Publish</a>
</div>

</div>
*/
