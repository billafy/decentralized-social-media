import Image from 'next/image';
import Link from 'next/link';
import {AuthorContainer, AvatarEl} from './styled/Follow.styled';

const Follow = ({src, username}) => {
	return (
		<Link key={1} href={{ pathname: '/profile', query: { id: 1 } }} passHref>
			<AuthorContainer>
				<AvatarEl>
					<Image src={src} width="50" height="50" />
				</AvatarEl>
				<span>
					{username}
				</span>
			</AuthorContainer>
		</Link>
	);
}

export default Follow;
