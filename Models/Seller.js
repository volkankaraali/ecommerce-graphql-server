const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
  companyName:{
    type: String,
  },

  address:{
    type: String,
  },

  telNo:{
    type: String,
  },

  created_at:{
    type: Number,
    default : Date.now()
  },

  userId:{
    type: mongoose.Schema.ObjectId
  }
})

module.exports = mongoose.model('sellers',SellerSchema);