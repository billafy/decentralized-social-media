import React from 'react'
import ReactDOM from "react-dom";
import { TextInput } from '/Users/jubal/Documents/GitHub/decentralized-social-media/decentralized-social-media-client/components/Profile/styled/Edit.styled.js';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {TextArea} from '@web3uikit/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import {Typography }from '@web3uikit/core';
import {Button }from '@web3uikit/core';
import {useDropzone} from 'react-dropzone';
import { providers } from 'ethers';


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const DContainer = styled.div` text-align: center;
padding: 20px;
border: 3px dashed #eeeeee;
background-color: #aqua;
color: #bdbdbd;
width: 50%
hover : {
  color: blue;
}

margin-bottom: 20px;`

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};



const Title = styled.h1`
font-weight: 500;
	font-size: 4vw;
	padding: 20px;
  text-align: center;
  color: #0F1C39;`

  const CapContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  padding-bottom: 40px;
  width: 50%;`

const Container = styled.div`
height: 300px;
  width: 50%;
  margin: 0 auto;`


  const BtnContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 50%;
  `


  

export default function createpost({ onCancel = () => {} }) {
  const router = useRouter()
  const dispatch = useDispatch();
  const { userProfile } = useSelector(state => state.auth);
  const [createObjectURL, setCreateObjectURL] = useState(null);
	const [ description, setDescription ] = useState("Enter Post Description");
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);
  
  // };
  const submitHandler2 = async event => {
		event.preventDefault();
		// try {
		// 	const response = await axios.put('/api/user/create', { description: description.trim(), mediaURL: files }, {
		// 		withCredentials: true,
		// 	});
		// 	dispatch({ type: 'SET_POST', payload: { userProfile: response.data.user } });
		// 	toast('Post Uploaded');
		// } catch (err) {
		// 	if(err.response.data.message)
		// 		toast(err.response.data.message);
		// }
    let pid= 1;
    console.log(description,files);
    toast('Post Succesfully uploaded!');
    let route = '/post?id='+pid;
    router.replace(route);
	};
  return (
    <form >
       <div>
        <Title>Create Post</Title>
        <img src={createObjectURL}/>
       <CapContainer>
       <TextArea
  label="Caption"
  name="Test TextArea Default"
  onBlur={function noRefCheck(){}}
  value={description}
  onChange={({ target: { value } }) => setDescription(value)}
  placeholder="Type here field"
  width= "1000px"
/>
   
       </CapContainer>

     <Container>
     <Typography
  onCopy={function noRefCheck(){}}
  variant="H1"
>
  Upload Post Image/Video
</Typography> 
{/* <Upload
  onChange={uploadImage}
  theme="withIcon"
/> */}
    <DContainer>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>

    </DContainer>
</Container>


<BtnContainer>
<Button
  onClick={submitHandler2}
  size="large"
  text="Upload Post"
/>



</BtnContainer>



    </div>
    <ToastContainer />
    </form>
   
  )
}
