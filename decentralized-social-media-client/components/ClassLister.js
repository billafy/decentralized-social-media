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
 export default classes;
// this creates a function called classes that takes class names as an argument
// and returns a spaced string of matching classes found in 'styles'