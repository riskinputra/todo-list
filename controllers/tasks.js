const Task    = require('../models/task')
const jwt     = require('jsonwebtoken')

class TaskController{
  static findAll(req, res){
    Task.find()
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
      description : res.body.description,
      status      : req.body.status,
      location    : req.body.location,
      startDate   : req.body.startDate,
      endDate     : req.body.endDate
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
      result.title       = req.body.title || result.title
      result.description = res.body.description || result.description
      result.status      = req.body.status || result.status
      result.location    = req.body.location || result.location
      result.startDate   = req.body.startDate || result.startDate
      result.endDate     = req.body.endDate || result.endDate

      result.save()
      .then(dataTask => {
        res.status(200).json({
          message   : 'Success to update',
          data      : dataTask
        })
      })
      .catch(err => {
        res.status(500).send(err)
      })
    })
    .catch(err => {
      res.status(500).send(err)
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