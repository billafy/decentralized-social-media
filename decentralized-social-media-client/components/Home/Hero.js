import Image from 'next/image';
import Link from 'next/link';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import Button from '../styled/Button.styled';
import { items } from './constants';
import {
	HeroEl,
	Title,
	Heading,
	Sub,
	Slider,
	ImgContainer,
	InfoContainer,
	MiddleSection,
	Date,
	STitle,
	Author,
	Arrow,
	Lines,
	LineImg
} from './styled/Hero.styled';

const Hero = () => {
	const [ index, setIndex ] = useState(0);
	const [ slides, setSlides ] = useState(items);
	const [ curSlide, setCurSlide ] = useState(items[0]);

	return (
		<HeroEl>
			<Title>
				<Heading>
					Discover, collect, and sell extraordinary NFTs
				</Heading>
			</Title>
			<Sub>OpenSea is the world's first and largest NFT marketplace</Sub>
			<Slider>
				<InfoContainer>
					<Button round>{curSlide.Badge}</Button>
					<MiddleSection>
						<BsChevronLeft
							onClick={() => {
								const indx = index - 1;
								if (index > 0) {
									setIndex(indx);
									setCurSlide(slides[indx]);
									return;
								}
								setIndex(slides.length - 1);
								setCurSlide(slides[slides.length - 1]);
							}}
						/>
						<div>
							<Date>{curSlide.Date}</Date>
							<STitle>{curSlide.Title}</STitle>
							<Link passHref href="#">
								<a>
									<Author>{curSlide.Author}</Author>
								</a>
							</Link>
						</div>
						<BsChevronRight
							onClick={() => {
								const indx = index + 1;
								if (index < slides.length - 1) {
									setIndex(indx);
									setCurSlide(slides[indx]);
									return;
								}
								setIndex(0);
								setCurSlide(slides[0]);
							}}
						/>
					</MiddleSection>
					<Button>View Drop</Button>
				</InfoContainer>
				<Lines>
					{slides.map(s => {
						return <Line key={s.Id} active={s.Id === curSlide.Id} />;
					})}
				</Lines>
				<ImgContainer>
					<Img>
						<Image layout="fill" src={curSlide.ImageSrc} />
					</Img>
				</ImgContainer>
			</Slider>
		</HeroEl>
	);
};

export default Hero;
