import {useState} from 'react';
import { CgSearch } from 'react-icons/cg';
import { SearchBarEl, SearchInput } from './styled/SearchBar.styled';
import Link from 'next/link';
import {useRouter} from 'next/router';

const SearchBar = () => {
	const router = useRouter();
	const [query, setQuery] = useState('');

	const search = async () => {
		await router.replace(`/search?query=${query}`);
		if(router.pathname === '/search')
			return router.reload(`/search?query=${query}`);
	};

	return (
		<SearchBarEl>
			<CgSearch onClick={search}/>
			<SearchInput placeholder="Search users, posts and NFTs" value={query} onChange={({target: {value}}) => setQuery(value)}/>
		</SearchBarEl>
	);
}

export default SearchBar;
