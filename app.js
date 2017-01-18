var express = require('express');
var app = express();

var jwt = require('jsonwebtoken');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');

var Todo = require('./app_api/models/todos').Todo
var User = require('./app_api/models/users').User
require('./app_api/models/db');
require('./app_api/config/passport');

var routesApi = require('./app_api/routes/index');

app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/api', routesApi);

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

// app.get('/login', function (req, res) {
//   User.find({}, function(err, users) {
//     res.send({data:users})
//   })
// });
//
// routesApi.post('/login', function(req, res) {
//   User.findOne({username: req.body.username}, function(err, user) {
//       if(err) throw err
//       if(!user) {
//         res.status(401).send('Didnt find username, please sign up')
//       } else {
//         var myToken = jwt.sign({ username: req.body.username }, 'merp merp')
//         res.status(200).json({data: mytoken})
//       }
//   })
// })
//
// app.post('/register', function(req, res) {
//   var user = new User({
//     username: req.body.username,
//     password: req.body.password
//   })
//   user.save(function(err, user) {
//     if(err) {return next(err) }
//     res.status(201).json({data: user})
//   })
// })

app.listen(3000, function() {
  console.log('app listening on port 3000');
});
