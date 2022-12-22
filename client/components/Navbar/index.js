import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { getSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { InjectedConnector } from 'wagmi/connectors/injected';
import axios from 'axios';
import SearchBar from './SearchBar';
import MobileSearchBar from './MobileSearchBar';
import { FiMenu } from 'react-icons/fi';
import { CgSearch } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';
import { Button } from '@web3uikit/core';
import { HeaderEl, Center, LogoText, Logo, Nav, SearchIcon, MenuIcon } from './styled/index.styled';
import Link from 'next/link';
import { Colors } from '../Theme';

const Navbar = ({ mobileMenu }) => {
	const { auth: { userProfile, isLoggedIn } } = useSelector(state => state);
	const { connectAsync } = useConnect();
	const { disconnectAsync } = useDisconnect();
	const { isConnected } = useAccount();
	const { signMessageAsync } = useSignMessage();
	const { isMobileMenuOpen, setIsMobileMenuOpen } = mobileMenu;
	const [ isSearchOpen, setIsSearchOpen ] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

	const handleConnect = async () => {
		try {
			const { account, chain } = await connectAsync({ connector: new InjectedConnector() });
			const { data } = await axios.post('/api/auth/request-message', {
				address: account,
				chain: chain.id,
				network: 'evm',
			});
			const message = data.message;
			const signature = await signMessageAsync({ message });
			await signIn('credentials', { message, signature, redirect: false });
			handleUserProfile();
		} catch (err) {
			console.log(err);
		}
	};

	const handleDisconnect = async () => {
		await disconnectAsync();
		await signOut({ redirect: false });
		handleUserProfile();
		router.replace('/');
	};

	const handleUserProfile = async () => {
		const session = await getSession();
		if (session) {
			dispatch({
				type: 'SIGN_IN',
				payload: {
					userProfile: {
						...session.user,
						balance: '0',
					},
				},
			});
		} else
			dispatch({ type: 'SIGN_OUT' });
	};

	useEffect(
		() => {
			handleUserProfile();
		},
		[]
	);

	return (
		<HeaderEl>
			<MenuIcon>
				{isMobileMenuOpen
					? <IoClose
							style={{ fontSize: '2.5rem' }}
							color={Colors.Background}
							onClick={() => {
								setIsMobileMenuOpen(!isMobileMenuOpen);
							}}
						/>
					: <FiMenu
							color={Colors.Background}
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
							<Link href="">Explore</Link>
						</li>
						<li>
							{isLoggedIn && <Link href="/createPost">Create</Link>}
						</li>
						{isLoggedIn &&
							userProfile &&
							<li>
								<Link href={{ pathname: '/profile', query: { id: userProfile._id.toString() } }}>My Profile</Link>
							</li>}
						{isLoggedIn
							? <li><Button onClick={handleDisconnect} text="Disconnect" /></li>
							: <li><Button onClick={handleConnect} text="Connect" /></li>}
					</ul>
				</Nav>
			</Center>
			{isSearchOpen ? <MobileSearchBar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} /> : ''}
			<SearchIcon>
				<CgSearch
					color={Colors.Background}
					onClick={() => {
						setIsSearchOpen(!isSearchOpen);
					}}
				/>
			</SearchIcon>
		</HeaderEl>
	);
};
export default Navbar;
