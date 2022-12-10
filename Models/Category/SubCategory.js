const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  name:{
    type: String,
  },

  parentCategoryId:{
    type: mongoose.Schema.ObjectId,
    ref:'parent_categories'
  },
  
  created_at:{
    type: Number,
    default : Date.now()
  },
 
})

module.exports = mongoose.model('sub_categories',SubCategorySchema);
