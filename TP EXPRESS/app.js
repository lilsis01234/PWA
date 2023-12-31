var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser')
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var indexRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
// var router = express.Router();

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/home', usersRouter);
app.use('/login',indexRouter);
app.use('/movies',indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'manifest.json'));
});

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'service-worker.js'));
});
app.listen(3002, () => console.log(`This app is listening on port 3002`));