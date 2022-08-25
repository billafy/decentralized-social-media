import styled from "styled-components";
import { CgSearch } from "react-icons/cg";
import { Colors, Devices } from "../Theme";
const SearchBarEl = styled.article`
  background-color: ${Colors.Background};
  padding: 0.66rem 0.9rem;
  gap: 0.5rem;
  height: 100%;
  max-width: 480px;
  flex: 1;
  align-items: center;
  display: none;

  @media ${Devices.Laptop} {
    display: flex;
  }
`;


const SearchInput = styled.input`
  border: none;
  font-size: 1.15rem;
  flex: 1;
  :focus {
    outline: none;
  }
`;

export default function SearchBar() {
  return (
    <SearchBarEl>
        <a href="/results"><CgSearch/></a>
        <SearchInput placeholder="Search collections" />
      
    </SearchBarEl>
  );
}
