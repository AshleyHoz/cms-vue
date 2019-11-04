import Vue from 'vue'
import Vuex from 'vuex'
// 引入持久化保存插件(需先在脚手架依赖中安装)
import createPersistedState from 'vuex-persistedstate'

// 引入各模块
import Menu from './modules/menu/index.js'
import Admin from './modules/admin/index.js'
import Cart from './modules/cart/index.js'

Vue.use(Vuex)


// 举例
// 持久化保存原理
// 接收 store 作为唯一参数
let persist = store => {
	// 当store初始化之后，取出localStorage存储的state
	if (localStorage.state) {
		store.replaceState(JSON.parse(localStorage.state));
	}
	// subscribe订阅者
	store.subscribe((mutation, state) => {
		// 每次 mutation 之后调用
		// mutation 的格式为 { type, payload }
		console.log(mutation, state)
		// 每次提交了mutation,都将数据存储到localStorage中，需转化成字符串
		localStorage.state = JSON.stringify(state);
	})
}


export default new Vuex.Store({
	state: {

	},
	mutations: {

	},
	actions: {

	},
	getters: {

	},
	modules: {
		Menu,
		Admin,
		Cart
	},
	plugins: [createPersistedState()], //持久化保存数据
})
