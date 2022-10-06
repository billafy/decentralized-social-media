import { BsInstagram, BsMedium, BsDiscord, BsTelegram } from 'react-icons/bs';
import { GrTwitter } from 'react-icons/gr';
import { FooterEl, Socials, CopyRight, Links } from './styled/index.styled';

const Footer = () => {
	return (
		<FooterEl>
			<Socials>
				<a hef="#">
					<BsInstagram />
				</a>
				<a hef="#">
					<GrTwitter />
				</a>
				<a hef="#">
					<BsMedium />
				</a>
				<a hef="#">
					<BsDiscord />
				</a>
				<a hef="#">
					<BsTelegram />
				</a>
			</Socials>
			<CopyRight>
				Copyright © ChainSpace
			</CopyRight>
			<Links>
				<a href="#">Help Center</a>
				<a href="#">T&C</a>
				<a href="#">Privacy Notice</a>
			</Links>
		</FooterEl>
	);
};

export default Footer;
