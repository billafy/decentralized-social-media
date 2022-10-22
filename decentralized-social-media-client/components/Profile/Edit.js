import { useState, useRef } from 'react';
import { Modal } from '@web3uikit/core';
import { Typography } from '@web3uikit/core';
import { Users } from '../../constants/info';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import abi from '../../constants/abi.json';
import addresses from '../../constants/addresses.json';
import { TextInput } from './styled/Edit.styled';
import axios from 'axios';

const Edit = ({ onCancel = () => {} }) => {
	const dispatch = useDispatch();
	const { userProfile } = useSelector(state => state.auth);
	const [ username, setUsername ] = useState(userProfile.username);
	const [ aboutMe, setAboutMe ] = useState(userProfile.aboutMe);

	const submitHandler2 = async event => {
		event.preventDefault();
		try {
			const response = await axios.post('/api/user/editProfile', { username: username.trim(), aboutMe: aboutMe.trim() }, {
				withCredentials: true,
			});
			dispatch({ type: 'SET_PROFILE', payload: { userProfile: response.data.user } });
			toast('Profile Updated');
		} catch (err) {
			if(err.response.data.message)
				toast(err.response.data.message);
		}
	};

	return (
		<form className="modal" onSubmit={submitHandler2}>
			<Modal
				cancelText="Discard Changes"
				id="regular"
				isVisible
				okText="Save Changes"
				okButtonColor="blue"
				onCancel={onCancel}
				onCloseButtonPressed={onCancel}
				onOk={submitHandler2}
				title={
					(
						<div style={{ display: 'flex', gap: 10 }}>
							<Typography color="#68738D" variant="h3">Edit Details</Typography>
						</div>
					)
				}
			>
				<div
					style={{
						padding: '20px 0 20px 0',
					}}
				>
					<TextInput
						placeholder="Username"
						type="text"
						value={username}
						onChange={({ target: { value } }) => setUsername(value)}
					/>
					<TextInput
						placeholder="About Me"
						type="text"
						value={aboutMe}
						onChange={({ target: { value } }) => setAboutMe(value)}
					/>
				</div>
			</Modal>
			<ToastContainer />
		</form>
	);
};

export default Edit;
