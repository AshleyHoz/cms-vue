import axios from 'axios'

let list = (data) => axios.get('/category/list',{params:data});
let subCate = (data) => axios.get('/category/sub',{params:data});
let insert = (data) => axios.post('/category/add',data);
let edit = (data) => axios.post('/category/edit',data);
let del = (data) => axios.post('/category/delete',data);


export default {
	list,
	subCate,
	insert,
	edit,
	del
}