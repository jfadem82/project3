var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
//requires mongoose and bcrypt for login

//determines schema
var User = mongoose.Schema({
  local : {
    email 	  : {type: String, require: true, unique: true},
    password  : String
  }, 
   facebook : {
   	id		  : String,
   	token 	: String,
   	email 	: String,
   	name	  : String
  }
});

//establishes password and login
User.methods.encrypt = function (password) {
  return bcrypt.hashSync (password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function (password) {
    return bcrypt.compareSync (password, this.local.password);
};

module.exports = mongoose.model('User', User);
//makes user model available