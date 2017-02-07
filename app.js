var express = require('express');
var app = express();

var cors = require('cors');
var jwt = require('jsonwebtoken');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');

var Todo = require('./app_api/models/todos').Todo
require('./app_api/models/db');
require('./app_api/config/passport');
var routesApi = require('./app_api/routes/index');
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors());
app.use('/api', routesApi);

app.get('/', function (req, res) {
  res.json({'hello': 'world'})
})


app.get('/:userId', function (req, res) {
  var userId = req.params.userId
  Todo.find({userId}, function(err, todos) {
    res.send({data:todos})
  })
});

app.post('/:userId', function(req, res, next) {
  var todo = new Todo({
    userId: req.body.userId,
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

app.listen(port, function() {
  console.log('app listening on port ' + port);
});
