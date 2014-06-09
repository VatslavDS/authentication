//server.js

//Set up

var express = require('express')
  , app = express()
  , port = process.env.PORT || 8080
  , mongoose = require('mongoose')
  , passport = require('passport')
  , flash = require('connect-flash');

var configDB = require('./config/database.js');

//configuration
mongoose.connect(configDB.url); //Connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function(){
	//set up our express application
	app.use(express.logger('dev')); //logs every request to the console
	app.use(express.cookieParser()); //read cookies (needed for auth)
	app.use(express.bodyParser()); //get information from html forms

	app.set('view engine', 'ejs'); //set up ejs for template 

       	//required for passport
	app.use(express.session({ secret: 'vatslavdsvatslavdsvatslavds'})); //session secrete
	app.use(passport.initialize());
	app.use(passport.session()); //persistent login sessions
	app.use(flash()); //use connect-flash for flash messages stored in session
});

//routes
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


//launch
app.listen(port);

console.log('The magic happens on port ' + port);


