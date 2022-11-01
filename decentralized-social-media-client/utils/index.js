export const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const classLister = styleObject => (...classList) => classList.reduce(
	(list, myClass) => {
		let output = list;
		if (styleObject[myClass]) {
			if (list) output += ' ';
			output += styleObject[myClass];
		}
		return output;
	},
	''
);

export const serialize = (object) => {
	return JSON.parse(JSON.stringify(object));
};
