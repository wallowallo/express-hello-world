var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

var JSONStream = require('JSONStream');

app.get('/', function (req, res) {
  var title = req.params.title
  var description = req.params.description
  var readable = fs.createReadStream('./todo.json')
  readable.pipe(res)
});

app.post('/', function(req, res) {
  res.send('heya')
});

app.put('/', function(req, res) {
  var title = req.params.title
  var description = req.params.description
  helpers.saveTodo(title, description) 
  res.end()
});

app.listen(3000, function() {
  console.log('app listening on port 3000');
});
