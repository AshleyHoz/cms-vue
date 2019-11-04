import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

let state = {
	// 购物车商品
	cart: [{
		id: 1,
		name: '烤煎饼',
		num: 1,
		price: 2,
		total: 0,
	}, {
		id: 2,
		name: '珍珠奶茶',
		num: 1,
		price: 3.5,
		total: 0,
	}, {
		id: 3,
		name: '羊肉串',
		num: 1,
		price: 1.5,
		total: 0,
	}, {
		id: 4,
		name: '牛肉',
		num: 1,
		price: 10,
		total: 0,
	}, {
		id: 5,
		name: '烧刀子',
		num: 1,
		price: 1.8,
		total: 0,
	}, {
		id: 6,
		name: '水煮鱼',
		num: 1,
		price: 15,
		total: 0,
	}]
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
	// 此处参数与new Sotre 时传的参数是一样的，不能更改，必须保持一致
}
