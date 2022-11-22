const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email:{
    type: String,
  },

  password:{
    type: String,
  },

  created_at:{
    type: Number,
    default : Date.now()
  },

  credentials:{
    token:{
      type: String,
    }
  }
})

module.exports = mongoose.model('users',UserSchema);