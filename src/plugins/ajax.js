// 使用ES6的Module模块进行封装
// 请求
import axios from 'axios'

// 将方法进行二次封装
let post = async (url, formData) => {
	// 知识点：解构、promise+async
	let { data } = await axios.post(url, formData);
	return data;
}

export default {
	post
}
