var express 	= require('express'),
	router 		= express.Router(),
	map 		= require('googlemaps'),
	Room 	= require('../models/room.js');

//INDEX

router.get('/', function(req, res) {
	Room.find({}, function(err, roomsArray) {
		if(err) {
			console.log(err);
		} else if(req.session.currentUser) {
			res.render('rooms/index', {rooms: roomsArray});
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
	newRoom.organizer = req.session.currentUser;
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
			res.render('rooms/show', {room: foundRoom, currentUser: req.session.currentUser});
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
	var updatedRoom = req.body.room;
	Room.update({_id: mongoId}, updatedRoom, function(err, foundRoom){
		if(err) {
			console.log(err);
		} else {
			res.redirect(301, '/rooms/' + mongoId);
		};
	});
});

module.exports = router;


















