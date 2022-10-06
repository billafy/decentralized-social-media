import { useState, useRef } from 'react';
import { Modal } from '@web3uikit/core';
import { Typography } from '@web3uikit/core';
import { Users } from '../../constants/info';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3Contract } from 'react-moralis';
import abi from '../../constants/abi.json';
import addresses from '../../constants/addresses.json';
import {TextInput} from './styled/Edit.styled';

const Edit = ({ onCancel = () => {} }) => {
	const dispatch = useDispatch();
	const { userProfile } = useSelector(state => state.auth);
	const [ username, setUsername ] = useState(userProfile.username);
	const [ aboutMe, setAboutMe ] = useState(userProfile.aboutMe);
	const { runContractFunction: updateUsername } = useWeb3Contract({
		abi: abi,
		contractAddress: addresses[1337],
		functionName: 'updateUsername',
		params: { username: username.trim() },
	});
	const { runContractFunction: updateAboutMe } = useWeb3Contract({
		abi: abi,
		contractAddress: addresses[1337],
		functionName: 'updateAboutMe',
		params: { aboutMe: aboutMe.trim() },
	});

	const submitHandler = async (event) => {
		event.preventDefault();
		if (username.trim().length && username.trim() !== userProfile.username) await updateUsername();
		if (aboutMe.trim().length && aboutMe.trim() !== userProfile.aboutMe) await updateAboutMe();
		dispatch({
			type: 'SET_PROFILE',
			payload: {
				userProfile: {
					...userProfile,
					username: username.trim(),
					aboutMe: aboutMe.trim(),
				},
			},
		});
		toast('Profile Updated!');
	};

	return (
		<form className="modal" onSubmit={submitHandler}>
			<Modal
				cancelText="Discard Changes"
				id="regular"
				isVisible
				okText="Save Changes"
				okButtonColor="blue"
				onCancel={onCancel}
				onCloseButtonPressed={onCancel}
				onOk={submitHandler}
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
