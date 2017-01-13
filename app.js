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

app.post('/', function(req, res, next) {
  var todo = new Todo({
    title: req.body.title,
    description: req.body.description
  })
  todo.save(function(err, todo) {
    if(err) {return next(err) } 
    res.status(201).json(todo)
  })
});

app.delete('/', function(req, res) {
  Todo.findByIdAndRemove(req.params._id, function(err, todo) {
    var response = {
      message: 'todo deleted',
    };
    res.send(response);
  })
})

app.listen(3000, function() {
  console.log('app listening on port 3000');
});
