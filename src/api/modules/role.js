import axios from 'axios'

let list = (data) => axios.get('/role/list',{params:data});
let del = (data) => axios.delete('/role',{params:data});
let update = (data) => axios.put('/role',data);
let add = (data) => axios.post('/role',data);

export default {
	list,
	del,
	update,
	add,
}