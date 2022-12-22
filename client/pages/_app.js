import { useState } from 'react';
import { Colors } from '../components/Theme';
import Navbar from '../components/Navbar';
import Button from '../components/styled/Button.styled';
import Page from '../components/styled/Page.styled';
import Footer from '../components/Footer';
import { MoralisProvider } from 'react-moralis';
import { useStore } from '../store';
import { Provider } from 'react-redux';
import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import '../styles/index.css';
import { GlobalStyle, Main, MobileMenu, NavItem } from '../styles/GlobalStyle.styled.js';

const { provider, webSocketProvider } = configureChains(defaultChains, [ publicProvider() ]);

const client = createClient({
	provider,
	webSocketProvider,
	autoConnect: true,
});

function MyApp({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState);
	const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false);

	return (
		<Provider store={store}>
			<MoralisProvider initializeOnMount={false}>
				<WagmiConfig client={client}>
					<SessionProvider session={pageProps.session} refetchInterval={0}>
						<GlobalStyle />
						<Main>
							<Navbar mobileMenu={{ isMobileMenuOpen, setIsMobileMenuOpen }} />
							<Page>
								<MobileMenu open={isMobileMenuOpen}>
									<ul>
										<li>
											<NavItem href="#">Explore</NavItem>
										</li>
										<li>
											<NavItem href="#">Create</NavItem>
										</li>
										<li />
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
						</Main>
					</SessionProvider>
				</WagmiConfig>
			</MoralisProvider>
		</Provider>
	);
}

export default MyApp;
