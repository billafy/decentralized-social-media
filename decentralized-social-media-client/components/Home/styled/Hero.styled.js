import styled from 'styled-components';
import { Colors, Devices } from '../../Theme';

export const HeroEl = styled.article`
  margin: 6rem 1rem 5rem 1rem;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${Devices.Laptop} {
    margin: 3rem 4rem 5rem 4rem;
  }

  @media ${Devices.LaptopL} {
    margin: 3rem 10rem 5rem 10rem;
  }
`;
export const Title = styled.h1`
  margin-bottom: 3rem;
  font-weight: 500;
  font-size: 1.7rem;

  @media ${Devices.Laptop} {
    font-size: 2.7rem;
  }
`;
export const Heading = styled.span``;
export const Sub = styled.span`
  font-size: 1.1rem;
  display: block;
`;

export const Slider = styled.div`
  position: relative;
  height: 35vh;
  min-height: 230px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  box-shadow: 0px 0px 3rem ${Colors.Primary};
  border-radius: 20px;

  @media ${Devices.Tablet} {
    height: 50vh;
  }
`;

export const ImgContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  filter: brightness(0.6);
  display: block;
`;

export const InfoContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: 3;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

export const MiddleSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  & > svg {
    font-size: 2.4rem;
    cursor: pointer;
    @media ${Devices.Tablet} {
      font-size: 3.4rem;
    }
  }
`;

export const Date = styled.span`
  font-weight: 500;
  font-size: 1.1rem;
`;
export const STitle = styled.h2`
  font-size: 1.3rem;
`;
export const Author = styled.span`
  color: ${Colors.Primary};
  font-size: 1.1rem;
  font-weight: 500;
`;
export const Arrow = styled.span``;

export const Lines = styled.span`
  position: relative;
  z-index: 3;
  display: flex;
  gap: 0.5rem;
`;
export const Line = styled.span`
  display: inline-block;
  width: 2rem;
  height: 0.25rem;
  border-radius: 30px;
  background-color: ${p => p.active ? Colors.Primary : Colors.White};
`;
export const Img = styled.div`
  width: 100%;
  height: 100%;
`;
