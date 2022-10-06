import { CgSearch } from 'react-icons/cg';
import { SearchBarEl, SearchInput } from './styled/SearchBar.styled';

const SearchBar = () => {
	return (
		<SearchBarEl>
			<a href="/results">
				<CgSearch />
			</a>
			<SearchInput placeholder="Search collections" />
		</SearchBarEl>
	);
}

export default SearchBar;
