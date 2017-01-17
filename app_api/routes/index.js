var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlTodoPage = require('../controllers/todo-page');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/todo', auth, ctrlTodoPage.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
