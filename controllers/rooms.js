var express 	= require('express'),
	router 		= express.Router(),
	map 		= require('googlemaps'),
	Room 	= require('../models/room.js');


//INDEX

router.get('/', function(req, res) {
	Room.find({}, function(err, roomsArray) {
		var expire = Room.createdAt + 600*1000;
		var nowDate = Date.now();
		if( nowDate - expire == 432000000) {
			Room.remove();
		};
		if(err) {
			console.log(err);
		} else if(req.session.currentUser) {
			currentUser = req.session.currentUser;
			console.log(currentUser);
			allRooms = Room.find().count(function(err, count) {
				console.log(count);
				res.render('rooms/index', {
					rooms: roomsArray,
					roomCount: count
				});
			});
		} else {
			res.redirect(301, '/../');
		};
	});
});

//NEW

router.get('/new', function(req, res) {
	res.render('rooms/new');
});

//CREATE

router.post('/', function(req, res) {
	var newRoom = new Room(req.body.room);
	newRoom.organizer = req.session.currentUser.first_name + req.session.currentUser.last_name;
	newRoom.hotel_name = req.session.currentUser.hotel_name;
	newRoom.street_address = req.session.currentUser.street_address;
	newRoom.city = req.session.currentUser.city;
	newRoom.state = req.session.currentUser.state;
	newRoom.zipcode = req.session.currentUser.zipcode;
	newRoom.save(function(err, room) {
		if(err) {
			console.log(err);
		} else {
			console.log(room);
			res.redirect(301, '/rooms');
		}
	})
})

//SHOW

router.get('/:id', function(req, res){
	var mongoId = req.params.id;
	Room.findOne({_id: mongoId}, function(err, foundRoom) {
		if(err) {
			console.log(err);
		} else {
			res.render('rooms/show', {room: foundRoom, currentUser: req.session.currentUser.first_name + req.session.currentUser.last_name });
			// console.log(room);
		}
	})
});

//DELETE

router.delete('/:id', function(req, res){
	var mongoId = req.params.id;

	Room.remove({ _id: mongoId}, function(err, foundRoom) {
		res.redirect(301, '/rooms');
	});
});

//EDIT

router.get('/:id/edit', function(req, res) {
	var mongoId = req.params.id;
	Room.findOne({_id: mongoId}, function(err, foundRoom) {
		if(err) {
			console.log(err);
		} else {
			res.render('rooms/edit', {room: foundRoom});
		}
	});
});

//UPDATE

router.patch('/:id', function(req, res){
	var mongoId = req.params.id;
	// var updatedRoom = req.body.room;
	var newWalker = req.session.currentUser.first_name + req.session.currentUser.last_name;
	Room.update({_id: mongoId}, {walker: newWalker}, function(err, foundRoom){
		if(err) {
			console.log(err);
		} else {
			res.redirect(301, '/rooms/' + mongoId);
		};
	});
});

module.exports = router;












