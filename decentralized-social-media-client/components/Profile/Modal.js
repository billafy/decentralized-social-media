import Follow from './Follow';
import { Users } from '../../constants/info';

const Modal = ({ onCancel = () => {}, followers }) => {
	return (
		<div className="modal">
			<h1>Followers</h1>
			{followers.map((follower, i) => {
				return <Follow username={Users[0].username} src={Users[0].Imgsrc} key={i} />;
			})}
			<button className="btn btn--alt" onClick={onCancel}>
				Cancel
			</button>
		</div>
	);
};

export default Modal;
