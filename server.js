const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const base58 = require('./base58.js');

const Url = require('./models/url');
const index = require('./routes/index');

//mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
mongoose.connect('mongodb://pooja:pooja@ds257589.mlab.com:57589/url-shortnr');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:not connected'));
db.once('open', function() {
  console.log("connected we are")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/static', express.static(path.join(__dirname, 'views/static')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.use('/', index);

const port = process.env.PORT || 8080

var server = app.listen(port, function(){
  console.log('Server listening on port', port);
});

module.exports = app;