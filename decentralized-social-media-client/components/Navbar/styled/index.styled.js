import styled from 'styled-components';
import { Colors, Devices } from '../../Theme';

export const HeaderEl = styled.header`
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

export const Center = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

export const LogoText = styled.a`
	font-size: 1.2rem;
	font-weight: 500;
	color: white;
`;

export const Logo = styled.img`
	width: 75px;
	padding-right: 1rem;
`;

export const Nav = styled.nav`
	margin-left: auto;
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

export const NavItem = styled.a`
	font-size: 1rem;
	color: white;
	font-weight: 500;
`;

export const SearchIcon = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	@media ${Devices.Laptop} {
		display: none;
	}
`;
export const MenuIcon = styled(SearchIcon)``;
