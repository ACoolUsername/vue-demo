import demoApi from '../api/demo'

export default {
	retrieveOrders({commit}){
		return demoApi.getOrders()
			.then((response) => {
				commit('addOrders', response.body)
			}).catch((err) => {
				console.log(err)
			})
	},

	createOrder({commit}, payload){
		return demoApi.createOrder(payload.body)
			.then((response) => {
				commit('addOrder', response.body)
			}).catch((err) => {
				console.log(err)
			})
	},

	deleteOrder({commit}, payload){
		return demoApi.deleteOrder(payload.id)
			.then((response) => {
				commit('deleteOrder', response.body.orderId)
			}).catch((err) => {
				console.log(err)
			})
	},

	editOrder({commit}, payload){
		return demoApi.editOrder(payload.id, payload.body)
			.then((response) => {
				commit('editOrder', response.body)
			}).catch((err) => {
				console.log(err)
			})
	}

}
