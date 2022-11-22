const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  name:{
    type: String,
  },

  created_at:{
    type: Number,
    default : Date.now()
  },
 
})

module.exports = mongoose.model('brands',BrandSchema);