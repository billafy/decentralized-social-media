import { Button, TextArea } from '@web3uikit/core';
import React from 'react'

import styles from "./Addcomment.module.scss";

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

// this creates a function called classes that takes class names as an argument
// and returns a spaced string of matching classes found in 'styles'

export default function Addcomment() {
  return (
    <div className={classes('writing')}>
		<TextArea width='370px' />
		
		<div className={classes('footer')}>
			<div className={classes('group-btn')}>
            <Button  text="Comment" />
			</div>
		</div>
	</div>
  )
}
