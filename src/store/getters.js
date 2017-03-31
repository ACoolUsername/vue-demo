import _ from 'lodash'

export default {
	orders: state => _.sortBy(state.orders, "orderName")
}