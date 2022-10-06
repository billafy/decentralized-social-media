import { CgSearch } from 'react-icons/cg';
import { SearchBarEl, SearchBarBg, SearchInput, HideSearchBar } from './styled/MobileSearchBar.styled';

const MobileSearchBar = ({ setIsSearchOpen }) => {
	return (
		<SearchBarEl>
			<SearchBarBg>
				<CgSearch />
				<SearchInput placeholder="Search collectibles and collections" />
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
