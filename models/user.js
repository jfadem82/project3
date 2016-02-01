var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

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

// Encrypts the password the user entered in sign up
User.methods.encrypt = function (password) {
  return bcrypt.hashSync (password, bcrypt.genSaltSync(8), null);
};

// Checks the users encrypted password for login
User.methods.validPassword = function (password) {
    return bcrypt.compareSync (password, this.local.password);
};

module.exports = mongoose.model('User', User);