var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send({
  "data": [
    { "title": "Do homework", "description": "Mathmatics" },
    { "title": "Clean my room", "description": "Stow away clothes" },
    { "title": "Hit the gym", "description": "Do chest and back exercises" },
  ]
}
);
});

app.listen(3000, function() {
  console.log('app listening on port 3000');
});
