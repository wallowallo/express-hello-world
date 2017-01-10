var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var JSONStream = require('JSONStream');

var todos = require('./todo.json')

function getTodoFilePath () {
  return path.join('./todo.json')
}

function saveTodo (data) {
  var fp = getTodoFilePath()
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), {encoding: 'utf8'})
}

app.use(bodyParser.json());

app.get('/', function (req, res) {
  var title = req.params.title
  var description = req.params.description
  var readable = fs.createReadStream('./todo.json')
  readable.pipe(res)
});

app.post('/', function(req, res) {
});

// app.put('/', function(req, res) {
//   var title = req.params.title
//   var description = req.params.description
//   helpers.saveTodo(title, description) 
//   res.end()
// });

app.listen(3000, function() {
  console.log('app listening on port 3000');
});
