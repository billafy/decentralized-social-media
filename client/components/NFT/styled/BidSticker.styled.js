import styled from "styled-components";
import { Colors, Devices } from "../../Theme";
import Button from "../../styled/Button.styled";

export const BidStickyEl = styled.article`
    background-color: white;
    box-shadow: 0 4px 40px rgb(0 0 0 /10%);
    border: 1px solid ${Colors.Border};
    padding: 0.8rem 1rem;
    border-radius: 5px;
    display: flex;
    position: sticky;
    background-color: ${Colors.White};
    bottom: 1rem;
`;
export const LeftSection = styled.div`
    display: none;
    flex: 1;
    gap: 1rem;
    @media ${Devices.Laptop} {
        display: flex;
    }
`;
export const ThumbEl = styled.span`
    width: 80px;
    height: 80px;
`;
export const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const EditionEl = styled.span`
    font-weight: 500;
`;
export const Title = styled.span`
    font-weight: 600;
    font-size: 1.8rem;
`;
export const RightSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.5rem;
    align-items: center;

    input {
        width: 100%;
        height: 40px;
        padding: 0px 0.5rem;
        border-radius: 3px;
        border: 2px solid ${Colors.Secondary};
    }

    @media ${Devices.Laptop} {
        flex: 0.6;
    }
`;
export const PlaceBidBtn = styled(Button)`
    flex: 1;
    width: 100%;
    font-size: 1.07rem;
    background-color: ${Colors.Secondary};
`;
export const TextEl = styled.span`
    color: ${Colors.Gray};
    font-size: 0.7rem;
`;