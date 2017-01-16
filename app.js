var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var Todo = require('./db').Todo
var User = require('./db').User

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
    res.status(201).json({data: todo})
  })
});

app.delete('/:_id', function(req, res) {
  Todo.findByIdAndRemove(req.params._id, function(err, todo) {
    res.send(todo.description);
  })
})

app.get('/login', function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
      if(err) throw err
      if(!user) {
        res.status(401).send('Please sign up')
      } else {
        res.status(200).json({data: user})
      }
  })
})

app.post('/signup', function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  })
  user.save(function(err, user) {
    if(err) {return next(err) }
    res.status(201).json({data: user})
  })
})

app.listen(3000, function() {
  console.log('app listening on port 3000');
});
