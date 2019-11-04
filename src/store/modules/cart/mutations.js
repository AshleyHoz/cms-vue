export default {
	// addNum(state, payload) {
	// 	return state.cart[payload].num++;
	// },
	// reduceNum(state, payload) {
	// 	return state.cart[payload].num--;
	// },
	del(state,payload){
		state.cart.splice(payload);
	},
	change(){
		
	}
}
