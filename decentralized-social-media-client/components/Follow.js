import React from 'react'
import styled from "styled-components";
import { Users } from "../constants/info";
import Image from 'next/image';
import Link from 'next/link';

import PropTypes from 'prop-types'

const AuthorContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  background-color: #F8F8FF;
  border-radius: 5%;
  margin: 10px;
  span {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`;
const AvatarEl = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
`;

function Follow(props) {
  return (
    
          <Link
          key={1}
          href={{ pathname: "/profile", query: { id: 1 } }}
          passHref
        >
          <AuthorContainer>
            <AvatarEl>
              <Image src={props.src} width="50" height="50" />
            </AvatarEl>
            <span>
              {props.username}
            </span>
          </AuthorContainer>
        </Link>
  )
}


export default Follow
