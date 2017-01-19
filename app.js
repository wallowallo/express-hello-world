var express = require('express');
var app = express();

var jwt = require('jsonwebtoken');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');

var Todo = require('./app_api/models/todos').Todo
require('./app_api/models/db');
require('./app_api/config/passport');

var routesApi = require('./app_api/routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use('/api', routesApi);

app.get('/', function (req, res) {
  Todo.find({}, function(err, todos) {
    res.send({data:todos})
  })
});

app.post('/', function(req, res, next) {
  var todo = new Todo({
    username: req.body.username,
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

app.listen(3000, function() {
  console.log('app listening on port 3000');
});
