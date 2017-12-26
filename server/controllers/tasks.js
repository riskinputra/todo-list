const Task    = require('../models/task')
const jwt     = require('jsonwebtoken')

class TaskController{
  static findAll(req, res){
    Task.find({userId: req.query.userId})
    .populate('userId')
    .exec()
    .then(results => {
      res.status(200).json({
        message   : 'Tasks',
        data      : results
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }

  static create(req, res){
    let dataTask = new Task ({
      userId      : req.body.userId,
      title       : req.body.title,
      description : req.body.description,
      status      : req.body.status,
      location    : req.body.location,
      latitude    : req.body.latitude,
      longtitude  : req.body.longtitude,
      startDate   : new Date(req.body.startDate).toLocaleString(),
      endDate     : new Date(req.body.endDate).toLocaleString()
    })
    
    dataTask.save()
    .then(results => {
      res.status(200).json({
        message   : 'Success to insert',
        data      : results
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }

  static findById(req, res){
    Task.findById(req.params.id)
    .then(result => {
      res.status(200).json({
        message   : 'Data Found',
        data      : result 
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }

  static update(req, res){
    Task.findById(req.params.id)
    .then(result => {
      result.status      = req.body.status || result.status
      
      result.save()
      .then(dataTask => {
        res.status(200).json({
          message    : 'Success to update',
          data       : dataTask
        })
      })
      .catch(err => {
        res.status(500).send(err)
      })
    })
    .catch(err => {
      res.status(500).send({message : err.message})
    })
  }

  static destroy(req, res){
    Task.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(200).json({
        message   : 'Success to delete',
        data      : result
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }
}

module.exports = TaskController