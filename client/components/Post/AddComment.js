import {useState} from 'react';
import { Button } from '@web3uikit/core';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {CommentBox, Footer} from './styled/AddComment.styled';

const AddComment = ({post, setPost}) => {
	const [text, setText] = useState('');
	const {userProfile} = useSelector(state => state.auth);

	const comment = async () => {
		if(text) {
			try {
				const response = await axios.post(`/api/post/${post._id}/comment`, {_id: userProfile._id, text}, {withCredentials: true});
				setPost(response.data.post);
				setText('');
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<CommentBox>
			<textarea value={text} onChange={({target: {value}}) => setText(value)}/>
			<Footer>
				<Button text='Comment' onClick={comment} disabled={!text}/>
			</Footer>
		</CommentBox>
	);
}

export default AddComment;
