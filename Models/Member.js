const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name:{
    type: String,
  },

  surname:{
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

module.exports = mongoose.model('members',MemberSchema);