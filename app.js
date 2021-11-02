const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan'); // LOGGING
const bodyParser = require('body-parser'); // BODY PARSING

mongoose.connect(
  'mongodb+srv://' +
  process.env.MONGO_PASS + ':' + process.env.MONGO_PASS +
  '@cluster0.yy2t0.mongodb.net/main-db?retryWrites=true&w=majority',
  {
    useNewUrlParser : true,
    useUnifiedTopology : true
  }
).catch(err => {
  console.log('There was an error with connection!');
  console.log(err);
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

// CORS
app.use(( req, res, next ) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if ( req.method === 'OPTIONS' ) {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

const billRoutes = require('./api/routes/bills');
const monthlyRoutes = require('./api/routes/monthlies');
const taskRoutes = require('./api/routes/tasks');

app.use('/bills', billRoutes);
app.use('/monthlies', monthlyRoutes);
app.use('/tasks', taskRoutes);

app.get('/ping', function ( req, res ) {
  res.status(200).json({ response : 'Pong!' });
});

// 404
app.use(( req, res, next ) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// OTHER
app.use(( error, req, res, next ) => {
  res.status(error.status || 500).json({
    error : {
      message : error.message
    }
  });
  next(error);
});

module.exports = app;
