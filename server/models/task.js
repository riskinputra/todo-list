const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const taskShcema = new Schema ({
  userId : {
    type      : Schema.Types.ObjectId,
    ref       : 'User'
  },
  title  : {
    type      : String,
    required  : [true, 'Title required'] 
  },
  description : {
    type      : String,
    required  : [true, 'Description required']
  },
  latitude    : {
    type      : Number,
  },
  longtitude  : {
    type      : Number
  },
  status      : {
    type      : Boolean,
    default   : false,
    required  : [true, 'Status required']
  },
  location : {
    type      : String
  },
  startDate : {
    type      : Date,
  },
  endDate   : {
    type      : Date
  },
  createdAt : {
    type      : Date,
    default   : new Date()
  }
})

const Task = mongoose.model('Task', taskShcema)
module.exports = Task
