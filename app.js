const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
let session = require('express-session');
const redis   = require("redis");
const client  = redis.createClient();
const RedisStore = require('connect-redis')(session);
const indexRouter = require('./routes/index');
const entriesRouter = require('./routes/entries');
const hbs = require( 'express-handlebars');

let WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 40510})

const connections = []

wss.on('connection', function (ws) {
  connections.push(ws);
  ws.on('message', function (message) {
    console.log('received: %s', message)
    connections.forEach((connection) => {
      connection.send(message)
    })
  })
})


let sessionConfig = {
  secret: 'afsafsagsgagasg',
  cookie: {},
  resave: false,
  saveUninitialized: true,
}
const app = express();


// Подключаем mongoose.
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/doctors', { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session(sessionConfig))

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allows you to use PUT, DELETE with forms.
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/', indexRouter);
app.use('/index', entriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;