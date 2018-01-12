const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const routes = require('./api/route.js');
const MONGODB_URI = require('../db/mongo.js');
const app = express();

mongoose.connect(MONGODB_URI, { useMongoClient: true });

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('port', process.env.PORT || 3000);

app.use('/', routes);

app.listen(app.get('port'), function () {
  console.log('Solo is running at localhost:' + app.get('port'));
});
