import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { getRandomNumber } from '../../utils';
import {
	CarouselEl,
	Title,
	Controls,
	CtrlBtn,
	ItemContainer,
	Item,
	Avatar,
	Name,
	BottomSection,
	Badge,
	Amount
} from './styled/Carousel.styled';

const Carousel = () => {
	const itemRef = useRef(null);
	const [ scrollPosition, setScrollPosition ] = useState('b'); /* b => beginning | m => middle | e => end */

	return (
		<CarouselEl>
			<Title>Top Creators</Title>
			<Controls>
				<CtrlBtn
					active={scrollPosition === 'e' || scrollPosition === 'm'}
					onClick={() => {
						itemRef.current.scroll({
							left: itemRef.current.scrollLeft - 200,
							behavior: 'smooth',
						});
					}}
				>
					<BsChevronLeft />
				</CtrlBtn>
				<CtrlBtn
					active={scrollPosition === 'b' || scrollPosition === 'm'}
					onClick={() => {
						itemRef.current.scroll({
							left: itemRef.current.scrollLeft + 200,
							behavior: 'smooth',
						});
					}}
				>
					<BsChevronRight />
				</CtrlBtn>
			</Controls>
			<ItemContainer
				ref={itemRef}
				onScroll={e => {
					const { scrollWidth, scrollLeft, offsetWidth } = e.target;
					const SL = Math.ceil(scrollLeft + offsetWidth);
					if (scrollLeft <= 0) setScrollPosition('b');
					if (scrollLeft > 0 && scrollLeft < scrollWidth) setScrollPosition('m');
					if (SL >= scrollWidth) setScrollPosition('e');
				}}
			>
				{Array(10).fill(true).map((_, i) => {
					return (
						<Link href="/profile" passHref key={i}>
							<a>
								<Item>
									<Avatar>
										<img
											src={
												`https://source.unsplash.com/random/${getRandomNumber(100, 900)}x${getRandomNumber(100, 900)}`
											}
											style={{
												height: '120px',
												width: '120px',
											}}
										/>
									</Avatar>
									<Name>Logan Paul</Name>
									<BottomSection>
										<Amount>$400,000</Amount>
									</BottomSection>
								</Item>
							</a>
						</Link>
					);
				})}
			</ItemContainer>
		</CarouselEl>
	);
};

export default Carousel;
