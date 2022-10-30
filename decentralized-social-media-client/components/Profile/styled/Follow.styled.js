import styled from 'styled-components';

export const AuthorContainer = styled.div`
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

export const AvatarEl = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
`;
