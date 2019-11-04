import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

let state = {
	isCollapse: false,
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
	// 此处参数与new Sotre 时传的参数是一样的，不能更改，必须保持一致
}
