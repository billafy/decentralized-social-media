import {useState} from 'react';
import { CgSearch } from 'react-icons/cg';
import {useRouter} from 'next/router';
import Link from 'next/link';
import { SearchBarEl, SearchBarBg, SearchInput, HideSearchBar } from './styled/MobileSearchBar.styled';

const MobileSearchBar = ({ setIsSearchOpen }) => {
	const router = useRouter();
	const [query, setQuery] = useState('');

	const search = async () => {
		await router.replace(`/search?query=${query}`);
		if(router.pathname === '/search')
			return router.reload(`/search?query=${query}`);
	};

	return (
		<SearchBarEl>
			<SearchBarBg>
				<CgSearch onClick={search}/>
				<SearchInput placeholder="Search users, posts and NFTs"  value={query} onChange={({target: {value}}) => setQuery(value)}/>
			</SearchBarBg>
			<HideSearchBar
				onClick={() => {
					setIsSearchOpen(false);
				}}
			>
				Hide
			</HideSearchBar>
		</SearchBarEl>
	);
};

export default MobileSearchBar;
