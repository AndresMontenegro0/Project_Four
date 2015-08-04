var express = require("express"),
    router     = express.Router(),
    User    = require("../models/user.js");
    bcrypt = require('bcrypt');

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
		        res.redirect(301, "../");
		    });
		})
	})
});

//LOGIN

router.get('/login', function(req, res) {
	res.render('users/login');
});

router.post('/login', function(req, res) {
	var loginAttempt = req.body.user;
	User.findOne({email: loginAttempt.email}, function(err, user) {
		if(user) {
			bcrypt.compare(loginAttempt.password, user.password, function(err, checked) {
				if(checked) {
					req.session.currentUser = user.first_name + " " + user.last_name;
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

router.delete('/logout', function(req, res) {
	console.log('hey');
	req.session.currentUser = undefined;
	res.redirect(301, '/');
});

module.exports = router;

















