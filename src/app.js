//Initializing main modules
var express = require('express')
var path = require('path');
var createError = require('http-errors');
var cookieParser = require('cookie-parser')
var logger = require('morgan');
var twilio = require('twilio');

//Routers declarations
var indexRouter = require('../routes/index.js');
var feedRouter = require('../routes/feedRouter.js');
var businessRouter = require('../routes/businessRouter.js');
var loginRouter = require('../routes/loginRouter.js')
var registerRouter = require('../routes/registerRouter.js')

//Initializing app
const app = express();

//Initializing MongoDB
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://admin:admin21321@cluster0.op2uu.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, '[Error] MongoDB connection error'))

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

//Configuring app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

//Initializing app connection with Routers
app.use('/', indexRouter);
app.use('/feed', feedRouter)
app.use('/business', businessRouter);
app.use('/login', loginRouter)
app.use('/register', registerRouter)

//Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;