import styled from 'styled-components';

export const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16,
};

export const DContainer = styled.div` text-align: center;
padding: 20px;
border: 3px dashed #eeeeee;
background-color: #aqua;
color: #bdbdbd;
width: 50%
hover : {
  color: blue;
}

margin-bottom: 20px;`;

export const thumbnail = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	width: '100px',
	height: '100px',
	padding: 4,
	boxSizing: 'border-box',
};

export const img = {
	display: 'block',
	width: '100%',
};

export const Title = styled.h1`
font-weight: 500;
	font-size: 2.5vw;
	padding: 20px;
  text-align: center;
  color: #0F1C39;`;

export const CapContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  padding-bottom: 40px;
  width: 50%;`;

export const Container = styled.div`
height: 300px;
  width: 50%;
  margin: 0 auto;`;

export const BtnContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 50%;
  `;
