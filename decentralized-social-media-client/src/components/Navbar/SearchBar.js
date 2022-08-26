import styled from "styled-components";
import { CgSearch } from "react-icons/cg";
import { Colors, Devices } from "../Theme";

const SearchBarEl = styled.article`
	background-color: ${Colors.Background};
	padding: 0.66rem 0.9rem;
	gap: 0.5rem;
	height: 45px;
	max-width: 450px;
	flex: 1;
	align-items: center;
	display: none;
	border-radius: 5px;
	margin-left: 1rem;
	a {
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 1.25rem;
		}
	}
	@media ${Devices.Laptop} {
		display: flex;
	}
`;

const SearchInput = styled.input`
	border: none;
	height: 40px;
	flex: 1;
	:focus {
		outline: none;
	}
`;

export default function SearchBar() {
	return (
		<SearchBarEl>
			<a href="/results">
				<CgSearch />
			</a>
			<SearchInput placeholder="Search collections" />
		</SearchBarEl>
	);
}
