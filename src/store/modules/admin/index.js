import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

let state = {
	userInfo: {},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}