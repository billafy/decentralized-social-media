import styled from 'styled-components';
import { Colors, Devices } from '../../Theme';

export const PostEl = styled.article`
  background-color: ${Colors.Primary};
  color: ${Colors.Black};
  padding: 1rem;
  display: flex;

  @media ${Devices.Laptop} {
    padding: 1rem 15%;
  }
`;
export const SectionContainer = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 2rem;
  @media ${Devices.Laptop} {
    flex-direction: row;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
`;
export const ImageEl = styled.div`
    overflow: hidden;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  flex: 1;
`;

export const AuthorContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 30px;
  margin-left: 6.875rem;
  span {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`;
export const AvatarEl = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
export const TimeLabel = styled.label`
  color: ${Colors.Gray};
  font-size: 0.9rem;
`;
export const UsernameEl = styled.h3``;

export const Title = styled.p`
  font-size: 1rem;
  display: inline-block;
  margin-right: 1rem;
  margin-left: 120px;
  max-width:400px;
`;

export const Likes = styled.span`
margin-left: 6.875rem;
`;

export const LikesEl = styled.span`padding:10px;`;

export const Des = styled.div`
  white-space: pre-wrap;
`;

export const Interact = styled.div`font-size: 2.4rem;
cursor: pointer;
color: #a89ec9;`;

export const Share = styled.div`display: flex;
align-items: center;
gap:1.5rem;
  width:100%;
  padding:0 0 .5rem 0;

  color: #a89ec9;`;

export const ShareLeft = styled.span`justify-content: start;
font-size: 2.4rem;
  cursor: pointer;
  color: #a89ec9;
  i:hover{
    color: #ee83e5;
  }`;

export const ShareRight = styled.span`flex-grow:1;
text-align: right;
font-size: 2.4rem;
  cursor: pointer;
  color: #a89ec9;
  i:hover{
    color: #ee83e5;
  }`;
