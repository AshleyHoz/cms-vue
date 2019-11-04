import Vue from 'vue'
import axios from 'axios'
import { Loading, Message } from 'element-ui';

// 引入路由实例
import router from '@/router.js'

// loading实例
let loading;

// 设置baseURL,自动将api地址前面拼接，${baseURL}/api/path
axios.defaults.baseURL = 'http://localhost:3000/';

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
	// console.log(config)
	// 在发送请求之前做些什么
	
	// loading打开
	loading = Loading.service({ background: 'rgba(0,0,0,0.2)' });
	
	// 注册、登录请求忽略token判断，取出config里的url
	if(config.url == '/admin/login' || config.url == '/admin/register' || config.url == '/upload/common'){
		return config;
	}
	// 登录成功， 返回token, 请在头部headers中设置Authorization: Bearer ${token}, 所有请求都必须携带token;
	// 获取token
	let token = sessionStorage.token;
	// 如果没有token------第一道防线，检测ajax，存在的问题：如果页面没有ajax则会显示页面，因此需要第二道防线
	if (!token) {
		Message.error({
			message: 'token失效，请重新登陆！',
			onClose: () => {
				// 编程式导航路由跳转replace push go
				// axios不在vue实例内部，因此需要将router import进来,再引用的时候就不需要写this.$router,
				// router是路由实例、
				router.replace('/login');
				// loading关闭
				loading.close();
			}
		});
	}
	config.headers.Authorization = `Bearer ${token}`; //${token}此处的token等于浏览器sessionStorage中的字符串，token是变化的，不能写死
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(({ status, data }) => {
	//在这里你可以判断后台返回数据携带的请求码
	// loading关闭
	loading.close();
	if (status === 200) {
		return data
	} else {
		// 非200请求抱错
		throw Error(data.msg || '服务异常')
	}
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});
