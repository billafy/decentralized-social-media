import styled from 'styled-components';
import { Colors, Devices } from '../../Theme';

export const ProfileEl = styled.article`
	background-color: ${Colors.Primary};
	color: ${Colors.Black};
	display: flex;
	flex-direction: column;

`;
export const Cover = styled.div`
	position: relative;
	width: min(1350px, 100%);
	text-align: center;
	height: 800px;
	padding: 1.5rem;
	margin: 100px auto;
	@media ${Devices.Laptop} {
		height: 300px;
	}
`;
export const Content = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20 4rem;
	padding: 20px;
	@media ${Devices.Laptop} {
		flex-direction: row;
	}
`;
export const Info = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	margin: auto;

	@media ${Devices.Laptop} {
		max-width: 25vw;
		align-items: flex-start;
	}
`;

export const Avatar = styled.span`
	transform: translateY(-50%);
	border-radius: 50%;
	overflow: hidden;
	width: 150px;
	height: 150px;
	display: block;
	margin-left: auto;
	margin-right: auto;
`;

export const Name = styled.h1`
	margin-top: -50px;
	margin-bottom: 0.5rem;
	color: ${Colors.Secondary};
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	text-align: center;
	width: 100%;
`;

export const Bio = styled.p`
	white-space: pre-wrap;
	font-size: 1rem;
	margin: auto;
	margin-bottom: 1.5rem;
	width: 300px;
	max-width: 95%;
	text-align: center;
`;

export const Stats = styled.div`
	width: 700px;
	max-width: 95%;
	margin: auto;
	border-top: 1px solid ${Colors.Border};
	border-bottom: 1px solid ${Colors.Border};
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	align-items: center;
	justify-content: center;
`;
export const StatItem = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.25rem;
`;

export const StatTitle = styled.span`
	color: ${Colors.Gray};
	:hover {
		transform: scale(1.5);
		color: ${Colors.Secondary};
	}
`;

export const StatValue = styled.span`
	font-weight: 500;
`;

export const BidGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
`;

export const NftBid = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem 0.5rem;
	border: 1px solid ${Colors.Border};
    border-radius: 5px;
	gap: 0.75rem;
	img {
		border-radius: 5px;
		width: 150px;
		margin: auto;
	}
	> div {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		align-items: center;
	}
	span {
		font-size: 0.75rem;
	}
`;