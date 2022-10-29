import React from 'react';
import styles from '../../styles/Comment.module.css';
import { Blockie } from '@web3uikit/web3';
import { classLister } from '../../utils';
import Moment from 'react-moment';

const classes = classLister(styles);

export default function Comment({comment}) {
	return (
		<div className={classes('comment')}>
			<div className={classes('profıle-ımage')}>
				<Blockie  seed={comment.user.address} size={12.5} />
			</div>
			<div className={classes('user-comment')}>
				<a className={classes('time')}>
					<Moment fromNow>
						{comment.createdAt}
					</Moment>
				</a>
				<div className={classes('username')}>{comment.user.username}</div>
				<p>{comment.text}</p>
			</div>
		</div>
	);
}
