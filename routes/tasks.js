const express = require('express');
const router = express.Router();
const Task = require('../controllers/tasks')
/* GET users listing. */

module.exports = router
  .get('/', Task.findAll)

  .post('/', Task.create)

  .get('/:id', Task.findById)

  .put('/:id', Task.update)

  .delete('/:id', Task.destroy)
