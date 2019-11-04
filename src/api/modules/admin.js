// 二次封装
// import $ajax from '@/plugins/ajax.js'
import axios from 'axios'

// let login = (data) => {
// 	// return 出来的也是promise对象
// 	return $ajax.post('/admin/login',data);
// }
// 等价于
// 箭头函数简写去掉return
// 由8080访问3000端口进行的一次方法封装
// let login = (data) => $ajax.post('/admin/login',data);
// let register = (data) => $ajax.post('/admin/register',data);
let login = (data) => axios.post('/admin/login',data);
let register = (data) => axios.post('/admin/register',data);
let list = (data) => axios.get('/admin/list',{params:data});
let info = (data) => axios.get('/admin/info',{params:data});
let del = (data) => axios.post('/admin/delete',data);
let update = (data) => axios.post('/admin/info',data);
let delImg = (data) => axios.post('/upload/delete',data);

export default {
	login,
	register,
	list,
	info,
	del,
	update,
	delImg
}