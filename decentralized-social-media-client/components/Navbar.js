import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { CgSearch } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { Colors, Devices } from "./Theme";
import Button from "./styled/Button.styled";
import SearchBar from "./Navbar/SearchBar";
import SearchBarMob from "./Navbar/MobileSearchBar";
import { useEffect, useState } from "react";
import { ConnectButton } from "@web3uikit/web3";
import { useWeb3Contract, useMoralis } from "react-moralis";
import abi from "../constants/abi.json";
import addresses from "../constants/addresses.json";
import { useDispatch, useSelector } from "react-redux";

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
	padding-right: 1rem;
`;

const Nav = styled.nav`
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

const NavItem = styled.a`
	font-size: 1rem;
	color: white;
	font-weight: 500;
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

export default function Navbar({ mobileMenu }) {
	const { MobileMenuIsOpen, setMobileMenuIsOpen } = mobileMenu;
	const [SearchIsOpen, setSearchIsOpen] = useState(false);
	const [showProfileLink, setShowProfileLink] = useState(false);
	const { account, isWeb3Enabled } = useMoralis();
	const { runContractFunction: createUser } = useWeb3Contract({
		abi: abi,
		contractAddress: addresses[1337],
		functionName: "createUser",
	});
	const { runContractFunction: getProfile } = useWeb3Contract({
		abi: abi,
		contractAddress: addresses[1337],
		functionName: "getProfile",
		params: { user: account },
	});
	const { runContractFunction: getBalance } = useWeb3Contract({
		abi: abi,
		contractAddress: addresses[1337],
		functionName: "getBalance",
	});
	const dispatch = useDispatch();

	const getUserProfile = async () => {
		try {
			let data = await getProfile();
			console.log(data);
			if (data && data.length && !data[data.length - 1]) {
				const txn = await createUser();
				await txn.wait(1);
				console.log(txn);
				data = await getProfile();
			}
			console.log(data);
			const balance = await getBalance();
			dispatch({
				type: "SET_PROFILE",
				payload: {
					userProfile: {
						username: data[0],
						aboutMe: data[1],
						followerCount: data[2].toString(),
						followingCount: data[3].toString(),
						follows: data[4],
						exists: data[5],
						balance: balance.toString(),
					},
				},
			});
		} catch (err) { console.log(err);}
	};

	useEffect(() => {
		if (isWeb3Enabled) getUserProfile();
		setShowProfileLink(isWeb3Enabled);
	}, [isWeb3Enabled]);

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
				<Logo src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png" />
				<LogoText href="/">ChainSpace</LogoText>
				<SearchBar />
				<Nav>
					<ul>
						<li>
							<NavItem href="/results">Explore</NavItem>
						</li>
						<li>
							<NavItem href="/results">Create</NavItem>
						</li>
						{showProfileLink && (
							<li>
								<NavItem href="/profile">Profile</NavItem>
							</li>
						)}
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
