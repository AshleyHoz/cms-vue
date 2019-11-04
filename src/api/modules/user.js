import axios from 'axios'

let del = (data) => axios.delete('/user', { params: data });
let login = (data) => axios.post('/user/login', data);
let register = (data) => axios.post('/user/register', data);
let edit = (data) => axios.put('/user', data);
let info = (data) => axios.get('/user', { params: data });
let list = (data) => axios.get('/user/list', { params: data });

export default {
	del,
	login,
	register,
	edit,
	info,
	list
}
