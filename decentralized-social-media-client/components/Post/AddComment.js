import { Button, TextArea } from '@web3uikit/core';
import React from 'react';
import styles from '../../styles/Addcomment.module.scss';
import {classLister} from '../../utils';

const classes = classLister(styles);

export default function Addcomment() {
	return (
		<div className={classes('writing')}>
			<TextArea width="370px" />

			<div className={classes('footer')}>
				<div className={classes('group-btn')}>
					<Button text="Comment" />
				</div>
			</div>
		</div>
	);
}
