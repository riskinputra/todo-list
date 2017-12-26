const express = require('express');
const router = express.Router();
const Signin = require('../controllers/signin')

module.exports = router
  .post('/', Signin.findOne)