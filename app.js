'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pushstart', {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true});
let db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function ()
{
  // we're connected!
});

//Add PugJS as our render engine
app.set('view engine', 'pug')

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Use Helmet for security
app.use(helmet())

// serve static files from template
app.use(express.static(__dirname + '/templates'));
app.use(express.static(__dirname + '/templates/css'));
app.use(express.static(__dirname + '/templates/fonts'));
app.use(express.static(__dirname + '/templates/images'));
app.use(express.static(__dirname + '/templates/scripts'));

// serve static files from scripts

// include routes
let routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
  let err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res)
{
  res.status(err.status || 500);
  res.send(err.message);
});


// listen on port 3000
app.listen(3000, function ()
{
  console.log('Express app listening on port 3000');
});