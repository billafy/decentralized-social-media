import styled from 'styled-components';
import { Colors, Devices } from '../../Theme';

export const CommentBox = styled.div`
    background: #ffffff;
    border: 1px solid ${Colors.Border};
    width: 100%;
    border-radius: 5px;
    padding: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    textarea {
        width: 100%;
        font-family: "Inter";
        color: #585757;
        height: 75px;
        overflow-y: auto;
        appearance: none;
        border: 0;
        outline: 0;
        resize: none;
        border: 1px solid ${Colors.Border};
        border-radius: 5px;
        padding: 0.5rem;
    }
    &:focus-within {
		border: 1px solid ${Colors.Secondary};
		box-shadow: 0px 0px 2px 2px rgba(0, 133, 255, 0.15);
	}
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
