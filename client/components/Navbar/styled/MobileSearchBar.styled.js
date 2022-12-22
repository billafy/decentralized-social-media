import styled from "styled-components";
import { Colors, Devices } from "../../Theme";

export const SearchBarEl = styled.article`
  background-color: ${Colors.Background};
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  flex: 1;
  align-items: center;
  display: flex;

  @media ${Devices.Laptop} {
    display: none;
  }
`;

export const SearchBarBg = styled.div`
  background-color: ${Colors.White};
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
  border-radius: 20px;
  padding: 0.5rem 0.7rem;

  svg {
    font-size: 1.5rem;
    color: ${Colors.Primary};
  }
`;

export const SearchInput = styled.input`
  border: none;
  font-size: 1.15rem;
  flex: 1;
  :focus {
    outline: none;
  }
`;

export const HideSearchBar = styled.span`
  cursor: pointer;
  color: ${Colors.White};
`;
