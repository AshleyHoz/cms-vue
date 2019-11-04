import axios from 'axios'

let list = (data) => axios.get('/article/list',{params:data});
let del = (data) => axios.post('/article/delete',data);
let detail = (data) => axios.get('/article/detail',{params:data});
let delImg = (data) => axios.post('/upload/delete',data);
let edit = (data) => axios.post('/article/edit',data);
let add = (data) => axios.post('/article/add',data);
let uploadPath = (data) => axios.post('/upload/common/',data);


export default {
	list,
	del,
	detail,
	delImg,
	edit,
	add,
	uploadPath
}