var port 		 = process.env.PORT || 3000
var express 	 = require('express');
var path 		 = require('path')
var app 		 = express();
var mongoose 	 = require('mongoose');
var passport 	 = require('passport');
var flash		 = require('connect-flash');
var ejsLayouts	 = require('express-ejs-layouts');
var logger 		 = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser 	 = require('body-parser');
var session 	 = require('express-session');
var mongoUri 	 = process.env.MONGOLAB_URI || 'mongodb://localhost/project3'

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs');
app.engine('ejs', require ('ejs').renderFile);
app.use(ejsLayouts);

mongoose.connect(mongoUri)


app.listen(port)
console.log('The server is running on port ' + port)