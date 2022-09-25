import Follow from "./Follow";
import { Users } from "../../constants/info";
function Modal(props) {
  function cancelHandler() {
    props.onCancel();
  }

  var flist = props.followers;


const fols = []

flist.forEach((id) => {
  console.log(id);
  fols.push(<Follow username={Users[0].username} src={Users[0].Imgsrc}/>)
})

  return (
    <div className='modal'>
      <h1>Followers</h1>
      {fols}

      <button className='btn btn--alt' onClick={cancelHandler}>
        Cancel
      </button>
    </div>

  );
}

export default Modal;
