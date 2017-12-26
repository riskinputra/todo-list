const User      = require('../models/user');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');
const FB        = require('fb');
require('dotenv').config()

const fb = new FB.Facebook({
  appId: process.env.APP_ID,
  cookie: true,
  xfbml: true,
  version: 'v2.11'
})
// ============================================

class UserController{
  static fbAccessToken(req, res, next){
    // console.log(req.body)
    FB.setAccessToken(req.body.token)
    next()
  }

  static login(req, res){
    // console.log(req.body)
    req.headers.access = req.body.token
    FB.api('/me', { fields: 'name,id,email', access_token: req.body.token}, (response)=>{
      // console.log(response)
      if(response){
        User.findOrCreate({
          name : response.name,
          email : response.email
        }, function(err, result){
          if(!err){  
            res.status(200).json({
              data : result
            })
          }  
        })
      }else{
        res.status(500).send(err)
      }
    });
  }
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
    let hash = bcrypt.hashSync(req.params.password, 10)
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
      res.status(500).send({message : err.message})
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