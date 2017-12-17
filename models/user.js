const mongoose  = require('mongoose')
const Schema    = mongoose.Schema;

const usersSchema = new Schema({
  email     : {
    type      : String,
    required  : [true, 'Email required']
  },
  username  : {
    type      : String,
    required  : [true, 'Username required']
  },
  password  : {
    type      : String,
    required  : [true, 'Password required']
  },
  role      : {
    type      : String,
    required  : [true, 'Role required']
  },
  createdAt : {
    type      : Date,
    default   : new Date()
  }
})

const User = mongoose.model("User", usersSchema);
module.exports = User