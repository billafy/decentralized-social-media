import { Button, TextArea } from '@web3uikit/core';
import React from 'react';
import {CommentBox, Footer} from './styled/AddComment.styled';

const AddComment = () => {
	return (
		<CommentBox>
			<textarea/>
			<Footer>
				<Button text='Comment'/>
			</Footer>
		</CommentBox>
	);
}

export default AddComment;
