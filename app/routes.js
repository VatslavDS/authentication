//app/routes.js

module.exports = function(app, passport){
   	//homepase
	app.get('/', function(req, res){
		res.render('index.ejs'); //load the index.ejs
	});

	//login GET
	app.get('/login', function(req, res){
		//render the page and pass in any flash data if it exists
		res.render('login.ejs', {message : req.flash('loginMessage')});
	});


	//signup GET
	app.get('/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage')});
	});
	
	//login POST	
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true //allow flash messages
	}));

	//signup POST
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', //redirect to the secure profile section
		failureRedirect : '/signup', //redirect back to the signup page if there is an error
		failureFlash : true //Allow flash messages
	}));

	//profile
	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', { user: req.user});
	});

	//logout
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
};

//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next){
	//if user is authenticated in the session, carry on
	if(req.isAuthenticated()){
		return next();
	}

	//if the aren't redirect the to the home page
	res.redirect('/');
}
		
	

