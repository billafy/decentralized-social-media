import styled from 'styled-components';

export const AuthorContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background-color: #F8F8FF;
  border-radius: 3px;
  margin: 10px;
  padding: 0.5rem 1rem;
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
  display: flex;
  align-items: center;
`;
