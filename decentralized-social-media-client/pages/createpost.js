import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TextArea } from '@web3uikit/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { Typography } from '@web3uikit/core';
import { Button } from '@web3uikit/core';
import { useDropzone } from 'react-dropzone';
import Moralis from 'moralis';
import {
	thumbsContainer,
	thumbnail,
	thumbnailInner,
	img,
	DContainer,
	Title,
	CapContainer,
	Container,
	BtnContainer
} from '../styles/CreatePost.styled.js';

const CreatePost = ({ onCancel = () => {} }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { isLoggedIn, userProfile } = useSelector(state => state.auth);
	const [ createObjectURL, setCreateObjectURL ] = useState(null);
	const [ description, setDescription ] = useState('');
	const [ file, setFile ] = useState(null);
	const [ fileBuffer, setFileBuffer] = useState(null);
	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': [],
		},
		onDrop: files => {
			const file = files[0];
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(file);
			reader.onloadend = () => convertToBuffer(reader);
			setFile(Object.assign(file, {preview: URL.createObjectURL(file)}));
		},
	});

	const convertToBuffer = async (reader) => {
		const buffer = await Buffer.from(reader.result);
		setFileBuffer(buffer);
	};

	useEffect(() => {
		return () => {
			if(file)
				URL.revokeObjectURL(file.preview);
		};
	}, []);

	const createPost = async event => {
		event.preventDefault();
		if(!isLoggedIn)
			return;
		const split = file.name.split('.');
		const extension = split[split.length - 1];
		await Moralis.start({ apiKey: 'BTVSYEbVjhpDyl5kVeF77g69T1oCNcAiiexJ81ceRh9dJyvNtg3o9mRSgdkmxE4j' });
		try {
			const ipfsResponse = await Moralis.EvmApi.ipfs.uploadFolder({
				abi: [{path: file.name, content: fileBuffer.toString('base64')}]
			});
			const fileUrl = ipfsResponse.data[0].path;
			const response = await axios.post('/api/post/create', {
				mediaUrl: fileUrl,
				description: description,
			}, {withCredentials: true});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form>
			<div>
				<Title>Create Post</Title>
				<img src={createObjectURL} />
				<CapContainer>
					<TextArea
						label="Caption"
						name="Test TextArea Default"
						onBlur={function noRefCheck() {}}
						value={description}
						onChange={({ target: { value } }) => setDescription(value)}
						placeholder="Type here field"
						width="1000px"
					/>
				</CapContainer>
				<Container>
					<Typography onCopy={function noRefCheck() {}} variant="H1">
						Upload Post Image/Video
					</Typography>
					<DContainer>
						<div {...getRootProps({ className: 'dropzone' })}>
							<input {...getInputProps()} />
							<p>Drag and drop some file here, or click to select a file</p>
						</div>
						{file && <aside style={thumbsContainer}>
							<div style={thumbnail} key={file.name}>
								<img
									src={file.preview}
									style={img}
									onLoad={() => {
										URL.revokeObjectURL(file.preview);
									}}
								/>
							</div>
						</aside>}
					</DContainer>
				</Container>
				<BtnContainer>
					<Button onClick={createPost} size="large" text="Upload Post" />
				</BtnContainer>
			</div>
			<ToastContainer />
		</form>
	);
};

export default CreatePost;
