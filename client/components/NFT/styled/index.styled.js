import styled from "styled-components";
import { Colors, Devices } from "../../Theme";

export const NFTEl = styled.article`
    background-color: ${Colors.Primary};
    color: ${Colors.Black};
    padding: 3rem 1rem;
    margin: 1rem 0px;
    display: flex;
    flex-direction: column;
    @media ${Devices.Laptop} {
        padding: 1rem 15%;
    }
`;
export const SectionContainer = styled.div`
    display: flex;
    gap: 2rem;
    flex-direction: column;
    @media ${Devices.Laptop} {
        flex-direction: row;
    }
`;

export const LeftSection = styled.div`
    display: flex;
    flex: 0.7rem;
    flex-direction: column;
    gap: 1rem;
`;
export const ImageEl = styled.div`
    overflow: hidden;
    width: 100%;
    img {
        border-radius: 5px;
        width: 100%;
    }
`;
export const ChainLink = styled.a`
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    font-weight: 500;
    align-items: center;
    border: 1px solid ${Colors.Border};
    padding: 1.5rem 1rem;
`;
export const RightSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    flex: 0.95;
`;

export const TopBtns = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    svg {
        font-size: 1.5rem;
    }
`;

export const LikesBtn = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
`;

export const ShareBtn = styled(LikesBtn)`
    svg {
        color: ${Colors.Secondary};
    }
`;

export const MoreBtn = styled(LikesBtn)`
    margin-left: auto;
`;

export const AuthorContainer = styled.div`
    display: flex;
    gap: 1.25rem;
    span {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
`;
export const AvatarEl = styled.div`
    border-radius: 50%;
    width: 30px;
    height: 30px;
`;
export const CreatorLabel = styled.label`
    color: ${Colors.Gray};
    font-size: 0.9rem;
`;

export const UsernameEl = styled.span``;

export const Title = styled.h1`
    font-size: 1.7rem;
    display: inline-block;
    margin-right: 1rem;
`;
export const MarketPlace = styled.span`
    border: 1px solid ${Colors.Gray};
    border-radius: 50px;
    padding: 0.2rem 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: ${Colors.Gray};
`;

export const Des = styled.p`
    white-space: pre-wrap;
`;
export const TagContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
`;
export const Tag = styled.span`
    border: 1px solid ${Colors.Black};
    border-radius: 5px;
    padding: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
`;