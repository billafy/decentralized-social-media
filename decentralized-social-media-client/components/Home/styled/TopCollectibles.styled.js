import styled from "styled-components";
import { Colors, Devices } from "../../Theme";

export const TopCollectiblesEl = styled.article`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	padding: 1rem;

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
export const TopSection = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;
`;

export const Sort = styled.div`
	border-radius: 30px;
	border: 1px solid ${Colors.Primary};
	padding: 0.4rem 1rem;
	cursor: pointer;
`;
export const Date = styled.div`
	background: linear-gradient(
		to right,
		${Colors.Gradients.PrimaryToSec[0]},
		${Colors.Gradients.PrimaryToSec[1]}
	);
	border-radius: 30px;
	padding: 0.4rem 2.5rem;
`;
export const ShowMore = styled.button`
	margin-top: 1rem;
	cursor: pointer;
	border: 1px solid ${Colors.Primary};
	padding: 1rem 2rem;
	color: ${Colors.Primary};
	background-color: transparent;
	border-radius: 5px;
	font-size: 1rem;
`;
