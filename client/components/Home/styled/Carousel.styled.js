import styled from "styled-components";
import { Colors, Devices } from "../../Theme";
import Button from "../../styled/Button.styled";

export const CarouselEl = styled.article`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 3rem 1rem;
	margin-top: 3rem;
	gap: 1rem;

	@media ${Devices.Tablet} {
		padding: 1rem 3rem;
	}

	@media ${Devices.Laptop} {
		padding: 1rem 5%;
	}

	@media ${Devices.LaptopL} {
		padding: 1rem 10%;
	}
`;

export const Title = styled.h1`
	font-size: 2.5rem;
	font-weight: 500;
`;
export const Controls = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	gap: 1rem;
`;
export const CtrlBtn = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: ${(p) => (p.active ? "pointer" : "")};
	width: 3rem;
	height: 3rem;
	color: ${(p) => (p.active ? Colors.Primary : Colors.PrimaryDisable)};
	font-size: 1.5rem;
	background-color: ${Colors.PrimaryDark};
	border-radius: 50%;
`;

export const ItemContainer = styled.div`
	overflow: hidden;
	overflow-x: auto;
	width: 100%;
	display: flex;
	gap: 2rem;
	padding: 1rem;
	scrollbar-width: 0;
	::-webkit-scrollbar {
		display: none;
	}
`;

export const Item = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.7rem;
	transition: background-color 0.3s;
	border-radius: 5px;
	padding: 0.8rem 1rem;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	:hover {
		background-color: ${Colors.Secondary};
		color: white;
	}
	:hover * {
		color: white;
	}
`;

export const Avatar = styled.span`
	display: flex;
	border-radius: 50%;
	overflow: hidden;
	height: 120px;
	width: 120px;
`;

export const Name = styled.h4`
	font-weight: 400;
`;

export const BottomSection = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: black;
`;
export const Badge = styled.span`
	position: relative;
	display: inline-block;
	border-radius: 50%;
	width: 1.5rem;
	height: 1.5rem;
	background-color: ${Colors.Primary};
	::after {
		content: ${(p) => (p.number ? `'${p.number}'` : "")};
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: ${Colors.Background};
		font-weight: 500;
		font-size: 0.8rem;
	}
`;
export const Amount = styled.span``;
