import React from 'react';
import styles from '../../styles/Comment.module.css';
import {classLister} from '../../utils';

const classes = classLister(styles);

export default function Comment(props) {
	return (
		<div className={classes('comment')}>
			<div className={classes('profıle-ımage')}>
				<img className={classes('avatar')} src={props.avi} />
			</div>

			<div className={classes('user-comment')}>
				<a className={classes('time')}>5 days ago</a>
				<div className={classes('username')}>{props.auth}</div>
				<p>{props.comment}</p>

				<div />

			</div>
		</div>
	);
}
