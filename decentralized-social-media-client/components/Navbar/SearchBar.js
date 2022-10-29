import { CgSearch } from 'react-icons/cg';
import { SearchBarEl, SearchInput } from './styled/SearchBar.styled';

const SearchBar = () => {
	return (
		<SearchBarEl>
			<a href="/results">
				<CgSearch />
			</a>
			<SearchInput placeholder="Search users, posts and NFTs" />
		</SearchBarEl>
	);
}

export default SearchBar;
