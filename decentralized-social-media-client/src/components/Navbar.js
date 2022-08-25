import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { CgSearch } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { Colors, Devices } from "./Theme";
import Button from "./styled/Button.styled";
import SearchBar from "./Navbar/SearchBar";
import SearchBarMob from "./Navbar/MobileSearchBar";
import { useState } from "react";
import { ConnectButton } from "@web3uikit/web3";

const HeaderEl = styled.header`
  z-index: 10;
  display: flex;
  color: ${Colors.White};
  width: 100%;
  align-items: center;
  height: 10%;
  gap: 1rem;
  padding: 1rem 1.5rem;
  top: 0;
  background-color: ${Colors.Secondary};
  position: sticky;

  svg {
    font-size: 2rem;
    cursor: pointer;
  }
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoText = styled.a`
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
`;

const Logo = styled.img`
  width: 75px;
  border-right: 1px solid ${Colors.Gray};
  padding-right: 1rem;
`;

const Nav = styled.nav`
  margin-left: auto;
  border-right: 1px solid ${Colors.Gray};
  padding-right: 1rem;
  display: none;

  ul {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 1rem;
  }

  @media ${Devices.Laptop} {
    display: block;
  }
`;

const NavItem = styled.a`
  font-size: 1rem;
  font-weight: 400;
  color: white;
  

`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${Devices.Laptop} {
    display: none;
  }
`;
const MenuIcon = styled(SearchIcon)``;

const AuthItems = styled(NavItem)`
  font-size: 1rem;
  display: none;
  @media ${Devices.Laptop} {
    display: inherit;
  }
`;

export default function Navbar({ mobileMenu }) {
  const { MobileMenuIsOpen, setMobileMenuIsOpen } = mobileMenu;
  const [SearchIsOpen, setSearchIsOpen] = useState(false);

  function toggleMenu() {
    setMobileMenuIsOpen(!MobileMenuIsOpen);
  }

  return (
    <HeaderEl>
      <MenuIcon>
        {MobileMenuIsOpen ? (
          <IoClose
            style={{ fontSize: "2.5rem" }}
            color={Colors.Primary}
            onClick={() => {
              toggleMenu();
            }}
          />
        ) : (
          <FiMenu
            onClick={() => {
              toggleMenu();
            }}
          />
        )}
      </MenuIcon>
      <Center>
        <Logo src="https://mintspace-media.fra1.digitaloceanspaces.com/wp-content/uploads/2021/12/09102516/trope-nft1.png" />
        <LogoText href="/">NFTSpace</LogoText>
        <SearchBar />
        <Nav>
          <ul>
            <li>
              <NavItem href="/results">Explore</NavItem>
            </li>
            <li>
              <NavItem href="/results">Create</NavItem>
            </li>
            <li>
              <ConnectButton />
            </li>
          </ul>
        </Nav>
      </Center>
      {SearchIsOpen ? (
        <SearchBarMob
          SearchIsOpen={SearchIsOpen}
          setSearchIsOpen={setSearchIsOpen}
        />
      ) : (
        ""
      )}
      <AuthItems href="/login">Sign In</AuthItems>
      <AuthItems href="/register">Sign Up</AuthItems>
      <SearchIcon>
        <CgSearch
          onClick={() => {
            setSearchIsOpen(!SearchIsOpen);
          }}
        />
      </SearchIcon>
    </HeaderEl>
  );
}
