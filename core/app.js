var express = require('express');
var cors = require('cors');

var mainRouter = require('./routes/main');
var engineRouter = require('./routes/engine');

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', mainRouter);
app.use('/engine', engineRouter);

module.exports = app;
