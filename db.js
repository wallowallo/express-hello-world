var uri = 'mongodb://localhost:27017/test'

var mongoose = require('mongoose')
mongoose.connect(uri)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(callback) {
  console.log('db connected')
})

var todoSchema = mongoose.Schema({
  title: String,
  description: String
})

var userSchema = mongoose.Schema({
  username: String,
  password: String
})

exports.Todo = mongoose.model('Todo', todoSchema)
exports.User = mongoose.model('User', userSchema)

