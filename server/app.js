const express       = require('express');
const path          = require('path');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const cors          = require('cors')
// ==============================================
const index         = require('./routes/index');
const users         = require('./routes/users');
const tasks         = require('./routes/tasks');
// ==============================================
const app = express();
require('dotenv').config()
// =============================================
const db            = mongoose.connection;
// mongoose.connect('localhost:27017/todo_list');
mongoose.connect(`mongodb://admin:${process.env.PASSWORD}@cluster0-shard-00-00-4ut9u.mongodb.net:27017,cluster0-shard-00-01-4ut9u.mongodb.net:27017,cluster0-shard-00-02-4ut9u.mongodb.net:27017/todo?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);
// ==============================================
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// ================================================
app.use('/', index);
app.use('/api/users', users);
app.use('/api/tasks', tasks);
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
  console.log(err);
  res.send('error');
});

module.exports = app;
