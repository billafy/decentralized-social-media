import Follow from './Follow';

const Modal = ({ onCancel = () => {}, list, title }) => {
	return (
		<div className="modal">
			<h1 style={{margin: '1rem 0px'}}>{title}</h1>
			{list.map((user, i) => {
				return <Follow user={user} key={i} />;
			})}
			<button className="btn btn--alt" onClick={onCancel}>
				Cancel
			</button>
		</div>
	);
};

export default Modal;
