var express = require("express"),
    router     = express.Router(),
    User    = require("../models/user.js");
    bcrypt = require('bcrypt');


// router.get('/', function(req, res) {
// 	console.log(req.session.currentUser);
// });

// NEW

router.get("/new", function (req, res) {
    res.render("users/new");
});

// CREATE >> we want to create a new user

router.post("/", function (req, res) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(req.body.user.password, salt, function(err, hash){
			req.body.user.password = hash;
		    var newUser = new User(req.body.user);
		    //now save the new user into our database
		    newUser.save(function (err, user) {
		        res.redirect(301, "../rooms");
		    });
		})
	})
});

//LOGIN

router.get('/login', function(req, res) {
	currentUser = req.session.currentUser;
	res.render('users/login');
});

router.post('/login', function(req, res) {
	var loginAttempt = req.body.user;
	User.findOne({email: loginAttempt.email}, function(err, user) {
		if(user) {
			bcrypt.compare(loginAttempt.password, user.password, function(err, checked) {
				if(checked) {
					req.session.currentUser={};
					req.session.currentUser.first_name = user.first_name;
					req.session.currentUser._id = user._id;
					req.session.currentUser.last_name = user.last_name;
					res.redirect(301, '../rooms');
					
				} else {
					res.redirect(301, '/users/login');
				};
			});
		} else {
			res.redirect(301, '/users/login');
		};
	});
});

// Show

router.get('/:id', function(req, res){
	var mongoId = req.params.id;
	User.findOne({_id: mongoId}, function(err, foundUser) {
		if(err) {
			console.log(err);
		} else {
			res.render('users/show', {user: foundUser});
		}
	})
});

router.delete('/logout', function(req, res) {
	console.log('hey');
	req.session.currentUser = undefined;
	res.redirect(301, '/');
});

module.exports = router;

















