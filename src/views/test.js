var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

let sum = (x, y) => {
	x++;
	y--;
	return x * y + x;
}

let obj = {firstName,lastName,year};

export default obj;
// export {
// 	// 起别名
// 	firstName as nickname,
// 	lastName as familyname,
// 	year,
// 	sum
// };
