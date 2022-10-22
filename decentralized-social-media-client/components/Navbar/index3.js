import { FiMenu } from 'react-icons/fi';
import { CgSearch } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';
import SearchBar from './SearchBar';
import MobileSearchBar from './MobileSearchBar';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@web3uikit/web3';
import { useWeb3Contract, useMoralis } from 'react-moralis';
import abi from '../../constants/abi.json';
import addresses from '../../constants/addresses.json';
import { useDispatch, useSelector } from 'react-redux';
import {
	HeaderEl,
	Center,
	LogoText,
	Logo,
	Nav,
	NavItem,
	SearchIcon,
	MenuIcon,
} from './styled/index.styled';

const Navbar = ({mobileMenu}) => {
	const { isMobileMenuOpen, setIsMobileMenuOpen } = mobileMenu;
	const [ isSearchOpen, setIsSearchOpen ] = useState(false);
	const [ showProfileLink, setShowProfileLink ] = useState(false);
	const { account, isWeb3Enabled } = useMoralis();
	const { runContractFunction: createUser } = useWeb3Contract({
		abi: abi,
		contractAddress: addresses[1337],
		functionName: 'createUser',
	});
	const { runContractFunction: getProfile } = useWeb3Contract({
		abi: abi,
		contractAddress: addresses[1337],
		functionName: 'getProfile',
		params: { user: account },
	});
	const { runContractFunction: getBalance } = useWeb3Contract({
		abi: abi,
		contractAddress: addresses[1337],
		functionName: 'getBalance',
	});
	const dispatch = useDispatch();

	const getUserProfile = async () => {
		try {
			let data = await getProfile();
			if (data && data.length && !data[data.length - 1]) {
				const txn = await createUser();
				await txn.wait(1);
				data = await getProfile();
			}
			const balance = await getBalance();
			dispatch({
				type: 'SET_PROFILE',
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
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(
		() => {
			if (isWeb3Enabled) getUserProfile();
			setShowProfileLink(isWeb3Enabled);
		},
		[ isWeb3Enabled ]
	);

	return (
		<HeaderEl>
			<MenuIcon>
				{isMobileMenuOpen
					? <IoClose
							style={{ fontSize: '2.5rem' }}
							color={Colors.Primary}
							onClick={() => {
								setIsMobileMenuOpen(!isMobileMenuOpen);
							}}
						/>
					: <FiMenu
							onClick={() => {
								setIsMobileMenuOpen(!isMobileMenuOpen);
							}}
						/>}
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
						{showProfileLink &&
							<li>
								<NavItem href="/profile">Profile</NavItem>
							</li>}
						<li>
							<ConnectButton />
						</li>
					</ul>
				</Nav>
			</Center>
			{isSearchOpen ? <MobileSearchBar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} /> : ''}
			<SearchIcon>
				<CgSearch
					onClick={() => {
						setIsSearchOpen(!isSearchOpen);
					}}
				/>
			</SearchIcon>
		</HeaderEl>
	);
}
export default Navbar;
