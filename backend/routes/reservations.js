var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/travelite');
var collection = db.get('reservations');

// Gets a list of reservations. Optional userid query filters reservations for the given user id
router.get('/', function (req, res) {
	let userid = req.query.userid;
	if (userid != undefined && (userid != null || userid != "")) {
		collection.find({user_id:parseInt(userid)}, function (err, reservations) {
			if (err) throw err;
			res.json(reservations);
		});
	}
	else {
		collection.find({}, function (err, reservations) {
			if (err) throw err;
			res.json(reservations);
		});
	}
});

// Gets a list of reservations with the given reservation_id
router.get('/:id', function (req, res) {
	collection.find({ reservation_id: parseInt(req.params.id) }, function (err, reservation) {
		if (err) throw err;
		res.json(reservation);
	});
});

// Adds a new reservation
router.post('/', function (req, res) {
	//req.body is used to read form input
	collection.insert({
		title: req.body.title,
		genre: req.body.genre,
		description: req.body.desc
	}, function (err, reservation) {
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
		res.json(reservation);
	});
});

// Update
router.put('/:id', function (req, res) {
	//req.body is used to read form input
	collection.update({ _id: req.params.id },
		{
			$set: {
				title: req.body.title,
				genre: req.body.genre,
				description: req.body.desc
			}
		}, function (err, video) {
			if (err) throw err;
			// if update is successfull, it will return updated object
			res.json(video);
		});
});

//delete
router.delete('/:id', function (req, res) {
	collection.remove({ _id: req.params.id }, function (err, video) {
		if (err) throw err;
		res.json(video);
	});
});






module.exports = router;
