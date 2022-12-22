import styled, { createGlobalStyle } from "styled-components";
import { Colors } from "../components/Theme";

export const GlobalStyle = createGlobalStyle`
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

export const Main = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100vh;
`;

export const MobileMenu = styled.div`
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

export const NavItem = styled.a`
	font-size: 1.2rem;
	font-weight: 400;
`;
