var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var JSONStream = require('JSONStream');
var Todo = require('./db').Todo

app.use(bodyParser.json());

app.get('/', function (req, res) {
  Todo.find({}, function(err, todos) {
    res.send({data:todos})
  })
});

app.post('/', function(req, res) {
});

app.listen(3000, function() {
  console.log('app listening on port 3000');
});
