var mongoose = require('mongoose')
var todoSchema = new mongoose.Schema({
  title: String,
  description: String
})

exports.Todo = mongoose.model('Todo', todoSchema)
