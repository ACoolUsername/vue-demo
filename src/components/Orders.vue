<template>
  <div class="orders-container">
    <div class="create-order-container container bg-info">
      <div class="row">
        <div class="col-sm-12"> 
          <h1>Orders</h1>
        </div>
      </div>
      <div class="row bg-info create-order-group">
        <div class="col-sm-8 vcenter" >
          <div class="form-group">
            <input type="text" class="form-control" id="orderName" placeholder="Order Name" v-model="name">
          </div>
        </div><div class="col-sm-4 vcenter">
         <div class="form-group">
            <button class="btn btn-info" @click="createEditOrderClickHandler">{{createEditText}}</button>
            <button v-if="editMode" class="btn btn-warning" @click="cancelEditOrderClickHandler">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div class="order-table-container container bg-info">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">Name</div>
        <div class="col-sm-4">Id</div>
      </div>
      <div class="row" v-for="order in orders">
        <div class="col-sm-4">
          <button class="btn btn-primary" @click="editOrderClickHandler(order.orderId)">Edit</button>
          <button class="btn btn-danger" @click="deleteOrderClickHandler(order.orderId)">Delete</button>
        </div>
        <div class="col-sm-4">{{order.orderName}}</div>
        <div class="col-sm-4">{{order.orderId}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'orders',
  data () {
    return {
      name:'',
      createEditText:'Create Order',
      editMode: false,
      id:''
    }
  },
  created(){
  	this.retrieveOrders()
  },
  computed:{
  	...mapGetters(['orders'])
  },
  methods:{
  	...mapActions(['retrieveOrders', 'createOrder', 'deleteOrder', 'editOrder']),
    createEditOrderClickHandler(){
      if(this.name){
        if(this.editMode){
          this.editOrder({id: this.id, body:{name: this.name}})
          this.cancelEditOrderClickHandler()
        }
        else{
          this.createOrder({body: {name: this.name}})
        }
      }
      else{
        alert('Name field required')
      }
      
      
    },
    deleteOrderClickHandler(id){
      if(confirm('Are you sure you want to delete this order?')){
        this.deleteOrder({id})
      }
    },

    editOrderClickHandler(id){
      const index = this.orders.findIndex((order) =>{
        return order.orderId === id
      })

      this.name = this.orders[index].orderName
      this.createEditText = 'Save Order Name'
      this.editMode = true
      this.id = id
    },

    cancelEditOrderClickHandler(){
      this.editMode = false
      this.createEditText = "Create Order"
      this.id = ''
      this.name = ''
    }

  }
}
</script>

<style>
.order-table-container{
  padding-top: 20px;
  padding-bottom: 20px;
}
.create-order-container{
  margin-bottom: 20px;
}


</style>
