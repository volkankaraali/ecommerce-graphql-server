const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
  memberId:{
    type: mongoose.Schema.ObjectId,
  },

  total_price:{
    type: Number
  },

  created_at:{
    type: Number,
    default : Date.now()
  },
 
})

module.exports = mongoose.model('order_details',OrderDetailSchema);