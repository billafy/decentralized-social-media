import styled from 'styled-components';
import { Colors, Devices } from '../../Theme';

export const CommentItem = styled.div`
    min-height: 80px;
    max-height: auto;
    padding: 0.75rem;
    background: #eae4ff;
    border-radius: 5px;
    display: flex;
    gap: 0.75rem;
`;

export const ProfileImage = styled.div`
    width:50px;
    height:50px;
    background:white;
    border-radius: 50%;
`;

export const UserComment = styled.div`
    display: flex;
    margin: 0px;
    flex-direction: column;
    gap: 0.25rem;
    p {
        color:#424242;
        margin:0px;
        font-size: 0.8rem;
    }
`;

export const Username = styled.div`
    color: #212121;
    &:hover {
        color:#757575;
    }
`;

export const Time = styled.p`
    font-size: 0.6rem;
    color:#212121;
    margin-left: auto;
`;
