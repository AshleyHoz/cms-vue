import { Admin } from '@/api/index'

export default {
	async loadInfo({ commit }) {
		// 请求数据
		let { id } = sessionStorage;
		let { status, data } = await Admin.info({ id });
		if (status) {
			// data实际赋值的是payload
			commit('saveUserInfo', data)
		}
		// actions本质是一个promise
		// 将data return出去就可以在navbar中调用then()方法
		return data;
	},
	async updateInfo({ commit }, payload) {
		console.log(payload)
		// 请求数据
		let { status, msg } = await Admin.update(payload);
		if (status) {
			// 同步修改右上角账户信息
			commit('saveUserInfo', payload)
		}
		return { status, msg };
	}
}
