import React from 'react'
import styles from "./Comment.module.css";

const classLister = styleObject => (...classList) =>
  classList.reduce((list, myClass) => {
    let output = list;
    if (styleObject[myClass]) {
      if (list) output += ' '; // appends a space if list is not empty
      output += styleObject[myClass]; 
      //Above: append 'myClass' from styleObject to the list if it is defined
    }
    return output;
 }, '');

const classes = classLister(styles); 

export default function Comment(props) {
  return (
    <div className ={classes('comment')}>
      <div className ={classes('profıle-ımage')}>
      <img className={classes('avatar')}
                          src={props.avi} />
      </div>
      
      <div className ={classes('user-comment')}>
      <a className={classes('time')}>5 days ago</a>
      <div className ={classes('username')}>{props.auth}</div>
        <p>{props.comment}</p>
        
        <div ></div>
        
      </div>
    </div> 
  )
}
