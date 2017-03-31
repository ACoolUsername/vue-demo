import Vue from 'vue'

export default {
	addOrders(state, orders){
		state.orders = orders
	},

	addOrder(state, order){
		state.orders.splice(0, 0, order)
	},

	deleteOrder(state, id){
		const index = state.orders.findIndex((element) => {
			return element.orderId === id
		})
		state.orders.splice(index, 1)
	},

	editOrder(state, order){
		const index = state.orders.findIndex((element) => {
			return element.orderId === order.orderId
		})
		Vue.set(state.orders, index, order)
	}
}