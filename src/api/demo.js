import Vue from 'vue'

export default {
	getOrders(){
		return Vue.http.get('http://ec2-54-149-222-23.us-west-2.compute.amazonaws.com:8080/api/orders')
	},
	
	createOrder(body){
		return Vue.http.post('http://ec2-54-149-222-23.us-west-2.compute.amazonaws.com:8080/api/orders', body)
	},

	deleteOrder(id){
		return Vue.http.delete(`http://ec2-54-149-222-23.us-west-2.compute.amazonaws.com:8080/api/orders/${id}`)
	},

	editOrder(id, body){
		return Vue.http.put(`http://ec2-54-149-222-23.us-west-2.compute.amazonaws.com:8080/api/orders/${id}`, body)
	}
}