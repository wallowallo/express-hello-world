var fs = require('fs')

var inputFile = './todo.json'
var outputFile = './todo.json'

var readable = fs.createReadStream(inputFile)
var writeable = fs.createWriteStream(outputFile)

readable.pipe(writeable)
