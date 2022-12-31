import styled from 'styled-components';
import {Colors} from '../../Theme';

export const MintContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    min-height: 300px;
    max-height: auto;
    width: 400px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 2px black;
    top: 10rem;
    left: calc(50vw - 200px);
    padding: 1.5rem;
    gap: 1rem;
`;

export const MintHeading = styled.h1`
    font-size: 1.75rem;
    text-align: center;
`;

export const MintInput = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    label {
        font-size: 0.9rem;
    }
    input {
        height: 40px;
        border: 0px;
        border-radius: 5px;
        transition: none;
        padding: 0px 0.5rem;
        border: 2px solid transparent;
        transition: 0.3s border-color;
        box-shadow: 0px 0px 2px black;
        &:focus {
            border-color: ${Colors.Secondary};
        }
    }
    button {
        position: absolute;
        bottom: 0px;
        right: 0px;
        height: 40px;
        width: 40px;
        color: 0px;
        background-color: transparent;
        border-radius: 5px;
        border: 0px;
        font-size: 1.5rem;
    }
`;

export const AddedTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

export const Tag = styled.div`
    position: relative;
    padding: 0.25rem 0.75rem;
    background-color: ${Colors.Secondary};
    color: white;
    border-radius: 5px;
    span {
        display: none;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: ${Colors.Secondary};
        border-radius: 5px;
        font-size: 1.5rem;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        svg {
            color: red;
        }
    }
    &:hover {
        span {
            display: flex;
        }
    }
`;

export const MintButton = styled.div`
    align-self: center;
`;

export const CloseButton = styled.div`
    align-self: flex-end;
    font-size: 1.5rem;
`;