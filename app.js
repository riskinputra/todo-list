const express       = require('express');
const path          = require('path');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
// ==============================================
const index         = require('./routes/index');
const users         = require('./routes/users');
// ==============================================
const app = express();

// =============================================
const db            = mongoose.connection;
mongoose.connect('localhost:27017/todo_list');
// ==============================================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// ================================================
app.use('/', index);
app.use('/api/users', users);
// ==================================================
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we\'re connected to database!')
});
// ==================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(error);
  res.send('error');
});

module.exports = app;
