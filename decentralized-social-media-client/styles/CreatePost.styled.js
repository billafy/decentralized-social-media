import styled from 'styled-components';
import {Colors} from '../components/Theme';

export const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16,
};

export const DContainer = styled.div`
	text-align: center;
	padding: 40px;
	border: 3px dashed #eeeeee;
	color: #bdbdbd;
	margin: 1rem auto;
	border-radius: 5px;
	height: 250px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
`;

export const thumbnail = {
	display: 'inline-flex',
	border: '1px solid #eaeaea',
	width: '150px',
	height: '150px',
	boxSizing: 'border-box',
	borderRadius: '5px'
};

export const img = {
	display: 'block',
	width: '100%',
	borderRadius: '5px'
};

export const Title = styled.h1`
	font-weight: 500;
	font-size: 1.75rem;
	padding: 2rem 0px 1rem 0px;
	text-align: center;
	color: #0F1C39;
`;

export const CapContainer = styled.div`
	margin: 1rem auto;
	text-align: center;
	width: min(700px, 90%);
	textarea {
		width: 100%;
		border: 3px solid ${Colors.Border};
		padding: 1rem;
		border-radius: 5px;
		resize: none;
		outline: none;
		font-size: 'Inter';
	}
`;

export const Container = styled.div`
	width: min(700px, 90%);
	margin: 0 auto;
`;

export const BtnContainer = styled.div`
	margin: 1rem auto;
	text-align: center;
	width: min(700px, 90%);
	display: flex;
	justify-content: center;
`;
