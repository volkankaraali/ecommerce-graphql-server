const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  order_detail_id:{
    type: mongoose.Schema.ObjectId,
  },

  productId:{
    type: mongoose.Schema.ObjectId,
    ref:"products"
  },

  quantity:{
    type: Number,
  },

  created_at:{
    type: Number,
    default : Date.now()
  },
 
})

module.exports = mongoose.model('order_items',OrderItemSchema);