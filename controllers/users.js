const User      = require('../models/user');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');
require('dotenv').config()
// ============================================
class UserController{

  static findAll(req, res){
    User.find()
    .then(result => {
      res.status(200).json({
        message   : 'Users',
        data      : result
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }

  static create(req, res){
    let hash  = bcrypt.hashSync(req.body.password, 10)
    let dataUser   = new User ({
      email       : req.body.email,
      username    : req.body.username,
      password    : hash,
      role        : req.body.role || 'user'
    })

    dataUser.save()
    .then(result => {
      res.status(200).json({
        message   : 'Success to create new user',
        data      : result
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }

  static findById(req, res){
    User.findById(req.params.id)
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
    let hash = bcrypt.hashSync(req.params.id, 10)
    User.findById(req.params.id)
    .then(result => {
      result.password = hash || result.password
      
      result.save()
      .then(dataUser => {
        res.status(200).json({
          message    : 'Success to update',
          data       : dataUser
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
    User.findByIdAndRemove(req.params.id)
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

module.exports = UserController