const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name:{
    type: String,
  },

  price:{
    type: Number,
  },

  imageUrl:{
    type: String,
  },

  sellerId:{
    type: mongoose.Schema.ObjectId
  },

  categoryId:{
    type: mongoose.Schema.ObjectId,
    ref: "Category"
  },

  brandId:{
    type: mongoose.Schema.ObjectId,
    ref: "Brand"
  },

  stock:{
    type: Number,
  },

  created_at:{
    type: Number,
    default : Date.now()
  },

})

module.exports = mongoose.model('products',ProductSchema);