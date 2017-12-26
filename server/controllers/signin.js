const User    = require('../models/user')
const jwt     = require('jsonwebtoken')

const FB      = require("fb");

require('dotenv').config()

class Signin {
  createToken(data){
    return jwt.sign({id:data},process.env.SECRET_KEY);
  }

  verifyToken(token){
    return jwt.verify(token, process.env.SECRET_KEY);
  }

  static findOne(req, res){
    User.findOne({
      username : req.body.username
    })
    .then(dataUser => {
      bcrypt.compare(req.body.password, dataUser.password)
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status(500).send(err)
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }
}

module.exports = Signin