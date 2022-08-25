import styled, { createGlobalStyle } from "styled-components";
import { Colors } from "../src/components/Theme";
import { useState } from "react";
import Navbar from "../src/components/Navbar";
import Button from "../src/components/styled/Button.styled";
import Page from "../src/components/styled/Page.styled";
import Footer from "../src/components/Footer";
import '../src/index.css'
import {MoralisProvider} from 'react-moralis';

const GlobalStyle = createGlobalStyle`
 

  html,
  body {
    background-color: ${Colors.Background};
    font-family: "Poppins", sans-serif;
  }

  p,a,h1,h2,h3,h5,h6,div,span{
    /* color:${Colors.Secondary}; */
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    transition:all .3s;
  }

  /* width */
  body::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  body::-webkit-scrollbar-track {
    background: #ffffff;
  }

  /* Handle */
  body::-webkit-scrollbar-thumb {
    background: #212121;
    border-radius: 20px;
  }

  /* Handle on hover */
  body::-webkit-scrollbar-thumb:hover {
    background: rgb(43, 43, 43);
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const MobileMenu = styled.div`
  background-color: ${Colors.Background};
  color: ${Colors.Secondary};
  z-index: ${(p) => (p.open ? "9" : "-1")};
  position: absolute;
  padding: 2rem 1rem 1rem 1.2rem;
  left: 0;
  display: flex;
  width: ${(p) => (p.open ? "100%" : "0")};
  height: 100%;

  ul {
    opacity: ${(p) => (p.open ? "1" : "0")};
    transition: all 0.1s ease-out;
    text-decoration: none;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  }
`;

const NavItem = styled.a`
  font-size: 1.2rem;
  font-weight: 400;
`;

function MyApp({ Component, pageProps }) {
  const [MobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  return (
    <>
      <GlobalStyle />
      <Main>
        <MoralisProvider appId={"VL2nnsLcDMzT70ycjmzg5fDexOYtFJ9X9dagYDBz"} serverUrl={"https://bphspx2smztf.usemoralis.com:2053/server"}>
        <Navbar mobileMenu={{ MobileMenuIsOpen, setMobileMenuIsOpen }} />
        <Page>
          <MobileMenu open={MobileMenuIsOpen}>
            <ul>
              <li>
                <NavItem href="#">Explore</NavItem>
              </li>
              <li>
                <NavItem href="#">Create</NavItem>
              </li>
              <li>
              </li>
              <hr color={Colors.Primary} size="1" />
              <li>
                <NavItem href="#">Sign In</NavItem>
              </li>
              <li>
                <NavItem href="#">Sign Up</NavItem>
              </li>
            </ul>
          </MobileMenu>
          <Component {...pageProps} />
        </Page>
        

        </MoralisProvider>
      </Main>
    </>
  );
}

export default MyApp;
