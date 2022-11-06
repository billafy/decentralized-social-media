import React from 'react';
import styles from '../../styles/Comment.module.css';
import { Blockie } from '@web3uikit/web3';
import { classLister } from '../../utils';
import Moment from 'react-moment';
import Link from 'next/link';
import {CommentItem, ProfileImage, UserComment, Time, Username} from './styled/Comment.styled';

const classes = classLister(styles);

export default function Comment({comment}) {
	return (
		<CommentItem>
			<ProfileImage>
				<Blockie seed={comment.user.address} size={12.5} />
			</ProfileImage>
			<UserComment>
				<Username>
					<Link href={{ pathname: '/post', query: { id: comment.user._id } }} passHref>
						{comment.user.username}
					</Link>
				</Username>
				<p>{comment.text}</p>
			</UserComment>
			<Time>
				<Moment fromNow>
					{comment.createdAt}
				</Moment>
			</Time>
		</CommentItem>
	);
}
