var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
  User.schema.pre('save', function (next) {
      var user = this;
      User.find({username : user.username}, function (err, users) {
          if (!users.length){
              next();
          }else{
              next(new Error("User exists!"));
          }
      });
  }) ;

  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);

  user.save(function(err) {
    if(err) {
      return res.status(401).json("Username is already taken")
    }
    var token;
    token = user.generateJwt();
    res.status(200).json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};
