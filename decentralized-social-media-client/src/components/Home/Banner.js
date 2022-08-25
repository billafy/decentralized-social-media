import styled from "styled-components";
import { Colors, Devices } from "../Theme";
import Button from "../styled/Button.styled";

const BannerEl = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background: url("/images/backdrop.png");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 6rem 1rem;
  gap: 1rem;

  @media ${Devices.MobileL} {
    padding: 6rem 4rem;
  }
  @media ${Devices.Tablet} {
    padding: 6rem;
  }
  @media ${Devices.Laptop} {
    padding: 6rem 30%;
  }
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 5vw;
  @media ${Devices.Laptop} {
    font-size: 4vw;
    color: white;
  }
`;
const Sub = styled.span`
  font-size: 1.12rem;
  color: white;
`;
const Input = styled.div`
  display: flex;
  height: 3rem;
  width: 100%;

  > input {
    border: none;
    border-radius: 5px 0 0 5px;
    padding: 0.5rem 1rem;
    font-size: 1.05rem;
    flex: 1;
  }
`;
const Btn = styled(Button)`
  border-radius: 0 5px 5px 0;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 10px;
  width: 6.25rem;
  background-color: #7B68EE;
  display: block;
  margin: auto;
`;
const Text = styled.p`
  font-size: 0.85rem;
`;
const PL = styled.a`
  color: ${Colors.Primary};
`;
const ChBox = styled.div`
  font-size: 0.85rem;

  input {
    margin-right: 1rem;
  }
`;

export default function Banner() {
  return (
    <BannerEl>
      <Title>
Discover, collect, and sell extraordinary NFTs</Title>
      <Sub>NFTSpace is the world's first and largest NFT Social Media Platform</Sub>
      <a href="/register">
      <Btn>Join</Btn>
      </a>
   
    
    </BannerEl>
  );
}
