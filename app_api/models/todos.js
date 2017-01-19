var mongoose = require('mongoose')
var todoSchema = new mongoose.Schema({
  username: String,
  title: String,
  description: String
})

exports.Todo = mongoose.model('Todo', todoSchema)
