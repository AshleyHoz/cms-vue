export default {
	totalNum({ cart }) {
		return cart.reduce((total, item) => total + item.num, 0)
	},
	totalPrice({ cart }) {
		return cart.reduce((total, item) => total + item.price * item.num, 0)
	},
	total: ({ cart }) => ({ num, price }) => {
		return num * price;
	}
}
