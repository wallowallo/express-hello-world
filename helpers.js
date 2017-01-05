var fs = require('fs')
var path = require('path')

function getTodoFilePath () {
  return path.join('todo.json')
}

function saveTodo (title, description, data) {
  var fp = getTodoFilePath()
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), {encoding: 'utf8'})
}

exports.getTodoFilePath = getTodoFilePath
exports.saveTodo = saveTodo
