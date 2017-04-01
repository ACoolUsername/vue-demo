<template>
  <div class="orders-container">

    <!-- Orders Form -->
    <div class="create-order-container container">
      <div class="row bg-accent create-order-group">
        <div class="col-sm-8">

          <!-- Order Name -->
          <div class="form-group">
            <input type="text" class="form-control" id="orderName" placeholder="Order Name" v-model="name" v-focus>
          </div>

        </div>
        <div class="col-sm-4">

          <!-- Create, Save and Cancel Buttons -->
          <div class="form-group">
            <div>
              <button class="btn btn-info full-width" @click="createEditOrderClickHandler">{{createEditText}}</button>
            </div>
            <div v-if="editMode" class="mt-2">
              <button class="btn btn-warning full-width" @click="cancelEditOrderClickHandler">Cancel</button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="order-table-container container bg-info">

      <!-- Heading Row -->
      <div class="mod-row row hidden-xs bg-accent">
        <div class="col-sm-4">
          <h4>Name</h4>
        </div>
        <div class="col-sm-4">
          <h4>Id</h4>
        </div>
        <div class="col-sm-4">
          <h4>Actions</h4>
        </div>
      </div>

      <!-- Order Row -->
      <div class="order-row mod-row row" :class="{ 'bg-row-accent': index % 2 !== 0 }" v-for="(order, index) in orders">
        <div class="col-sm-4 vcenter-sm">
          <p class="bold-sm">{{order.orderName}}</p>
        </div>
        <div class="col-sm-4 vcenter-sm">
          <p>{{order.orderId}}</p>
        </div>
        <div class="col-sm-4 vcenter-sm">
          <button class="btn btn-info mr-2" @click="editOrderClickHandler(order.orderId)">Edit</button>
          <button class="btn btn-danger" @click="deleteOrderClickHandler(order.orderId)">Delete</button>
        </div>
      </div>

    </div>
    
  </div>
</template>

<script>
// Get vuex helper functions
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'orders',
  data () {
    // Data properties local to this component
    // and can be referenced by using the 'this' context.
    return {
      name:'',
      createEditText:'Create Order',
      editMode: false,
      id:''
    }
  },
  directives: {
    focus: {
      // When the bound element is inserted into the DOM...
      inserted(el) {
        // Focus the element with the v-focus attribute
        el.focus()
      },
      // After the containing component has updated...
      update(el) {
        // Focus the element with the v-focus attribute
        el.focus()
      }
    }
  },
  created(){
    // When this component is created, hit the
    // API and request orders from the database
    // to store them in the vuex state.
  	this.retrieveOrders()
  },
  computed:{
    // Computed property that references
    // the orders stored in the state.
  	...mapGetters(['orders'])
  },
  methods:{
    // Various vuex actions defined by us
    // to alter orders in DynamoDB (CRUD). 
  	...mapActions(['retrieveOrders', 'createOrder', 'deleteOrder', 'editOrder']),
    // Create/Save button handler
    createEditOrderClickHandler(){
      if(this.name){
        if(this.editMode){
          // Submit edit
          this.editOrder({id: this.id, body:{name: this.name}})
        }
        else{
          // Submit new order
          this.createOrder({body: {name: this.name}})
        }
        // Clear input field
        this.cancelEditOrderClickHandler()
      }
      else{
        alert('Name field required')
      }
    },
    // Delete button handler
    deleteOrderClickHandler(id){
      if(confirm('Are you sure you want to delete this order?')){
        this.deleteOrder({id})
      }
    },
    // Edit button handler
    editOrderClickHandler(id){
      const index = this.orders.findIndex((order) =>{
        return order.orderId === id
      })

      this.name = this.orders[index].orderName
      this.createEditText = 'Save Order Name'
      this.editMode = true
      this.id = id
    },
    // Cancel button handler
    cancelEditOrderClickHandler(){
      this.editMode = false
      this.createEditText = "Create Order"
      this.id = ''
      this.name = ''
    }

  }
}
</script>

<style lang="stylus">

// Helpers
.full-width {
 width: 100%;
}
.half-width-sm {
  @media (min-width: 768px) {
    width: calc(50% - 8px);
    margin-left: 2px;
    margin-right: 2px;
  }
}
.bg-accent {
  background-color: #2c3e50;
  color: #fff;
}
.bg-row-accent {
  background-color: #8cd4f7;
}
.mt-2 {
  margin-top: 8px;
}
.mb-2 {
  margin-bottom: 8px;
}
.mr-2 {
  margin-right: 8px;
}
.vcenter-sm {
  @media (min-width: 768px) {
    display: inline-block;
    vertical-align: middle;
    float: none;
  }
}
.bold-sm {
  @media (max-width: 767px) {
    font-weight: bold;
  }
}

// Form
.create-order-container {
  margin-bottom: 20px;
}
.create-order-group {
 padding-top: 16px;
}

// Table
.order-table-container{
  
  .mod-row [class*="col-"] {
    text-align: left;
    padding-top: 8px;
    padding-bottom: 8px;
    
    p {
      margin: 0;
    }
  }
}
</style>
