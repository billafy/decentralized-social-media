import React, { useRef } from 'react'
import { Modal } from '@web3uikit/core';
import {Typography} from '@web3uikit/core';
import { Users } from '../constants/info';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  


const Textinput = styled.input` font-family: "Roboto", sans-serif;
outline: 0;
background: #f2f2f2;
width: 100%;
border: 0;
margin: 0 0 15px;
padding: 15px;
box-sizing: border-box;
font-size: 20px;`


export default function Edit(props) {
    const usernameRef = useRef();
    const bioRef = useRef();
    function cancelHandler() {
        props.onCancel();
      }

    function submitHandler(event) {
        event.preventDefault();
        
        const username = usernameRef.current.value;
        const bio = bioRef.current.value;
        console.log(username);
        console.log(bio)
        const msg = `Profile Details updated! Username : ${username} and  Bio: ${bio}`;
        console.log(msg);
        toast(msg);
        <ToastContainer />
        

    }

    function updatemessage(uname,bio){
        const msg = `Details updated to ${uname} and ${bio}`
        
    }
  return (
    <form className='modal' onSubmit={submitHandler}>
    <Modal
      cancelText="Discard Changes"
      id="regular"
      isVisible
      okText="Save Changes"
      okButtonColor="blue"
      onCancel={cancelHandler}
      onCloseButtonPressed={cancelHandler}
      onOk={submitHandler}
      title={<div style={{display: 'flex', gap: 10}}><Typography color="#68738D" variant="h3">Edit Details</Typography></div>}
    >
      <div
        style={{
          padding: '20px 0 20px 0'
        }}
      >
        
        <Textinput
  placeholder="Username"
  type="text"
  ref={usernameRef}
/>
<Textinput
  placeholder="Bio"
  type="text"
  ref={bioRef}
/>

      </div>
    </Modal>
    <ToastContainer />
  </form>
  )
}
