const mongoose = require('mongoose');

const ParentCategorySchema = new mongoose.Schema({
  name:{
    type: String,
  },

  created_at:{
    type: Number,
    default : Date.now()
  },
 
})

module.exports = mongoose.model('parent_categories',ParentCategorySchema);
