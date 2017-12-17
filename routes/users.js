const express = require('express');
const router = express.Router();
const User = require('../controllers/users')
/* GET users listing. */

module.exports = router
  .get('/', User.findAll)

  .post('/', User.create)

  .get('/:id', User.findById)

  .put('/:id', User.update)

  .delete('/:id', User.destroy)
