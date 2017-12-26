const mongoose        = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const Schema          = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate')

const usersSchema = new Schema({
  email     : {
    type      : String,
    unique    : true,
    required  : [true, 'Email required']
  },
  name  : {
    type      : String,
    required  : [true, 'Username required']
  },
  createdAt : {
    type      : Date,
    default   : new Date()
  }
})

usersSchema.plugin(uniqueValidator, {type: 'mongoose-unique-validator'})
usersSchema.plugin(findOrCreate)
const User = mongoose.model("User", usersSchema);
module.exports = User