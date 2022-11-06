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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: min(1200px, 90%);
    margin-top: 40px;
    margin: 40px auto 0px auto;
    gap: 1rem;
    @media (max-width: 868px) {
        margin: auto;
        grid-template-columns: 1fr;
    }
`;

export const LeftSection = styled.div`
    border: 1px solid ${Colors.Border};
    padding: 1rem;
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
    border-radius: 5px;
`;

export const ImageEl = styled.div`
    border-radius: 5px;
    overflow: hidden;
`;

export const RightSection = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 0.85rem;
    border: 1px solid ${Colors.Border};
    padding: 1rem;
`;

export const AuthorContainer = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
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
    font-size: 0.75rem;
`;

export const UsernameEl = styled.h3`
    color: black;
`;

export const Title = styled.p`
    font-size: 1rem;
    padding: 0.5rem 0.25rem;
`;

export const Likes = styled.span`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0px 0.25rem;
`;

export const LikesEl = styled.span`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const Des = styled.div`
    display: flex;
    white-space: pre-wrap;
    flex-direction: column;
    gap: 0.75rem;
`;

export const Interact = styled.div`
    font-size: 2.25rem;
    color: #a89ec9;
`;

export const Share = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #a89ec9;
`;

export const ShareLeft = styled.span`justify-content: start;
    cursor: pointer;
    font-size: 2.25rem;
 `;
