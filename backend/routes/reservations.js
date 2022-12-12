var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/travelite');
var collection = db.get('reservations');

// Gets a list of reservations. Optional userid query filters reservations for the given user id
router.get('/', function (req, res) {
	let userid = req.query.userid;
	if (userid != undefined && (userid != null || userid != "")) {
		collection.find({ user_id: parseInt(userid) }, function (err, reservations) {
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
	console.log(req.params)
	collection.find({ reservation_id: parseInt(req.params.id) }, function (err, reservation) {
		if (err) throw err;
		res.json(reservation);
	});
});

// Adds a new reservation
router.post('/', function (req, res) {
	console.log(req.body)
	// console.log(req.body.data.start_date)
	collection.find({ property_id: req.body.property_id }, function (err, reservations) {
		if (err) {
			res.status(400)
			return res.json({ "message": err });
		} else {
			for (const reservation in reservations) {
				data = reservations[reservation]
				if (!(new Date(req.body.start_date) > data["end_date"] || new Date(req.body.end_date) < data["start_date"])) {
					return res.json({ "message": "this date range is not available" })
				}
			}
			collection.insert({
				reservation_id: req.body.reservation_id,
				user_id: req.body.user_id,
				property_id: req.body.property_id,
				start_date: new Date(req.body.start_date),
				end_date: new Date(req.body.end_date)
			}, function (err, reservation) {
				if (err) {
					res.status(400)
					return res.json({ "message": err });
				} else {
					return res.json(reservation)
				}
			});
		}
	})
});

// Update an existing reservation
router.put('/:id', function (req, res) {
	//req.body is used to read form input
	collection.update({ reservation_id: parseInt(req.params.id) },
		{
			$set: {
				user_id: req.body.user_id,
				property_id: req.body.property_id,
				start_date: new Date(req.body.start_date),
				end_date: new Date(req.body.end_date)
			}
		}, function (err, reservation) {
			if (err) {
				res.status(400)
				res.json({ "message": err });
			} else {
				res.json(reservation)
			}
		});
});

// Delete a reservation
router.delete('/:id', function (req, res) {
	collection.find({ reservation_id: parseInt(req.params.id) }, function (err, reservation) {
		if (err) {
			res.status(400)
			return res.json({ "message": err });
		} else {
			const currentDate = new Date()
			const startDate = new Date(reservation[0]["start_date"])
			const modifiedStartDate = new Date(startDate.setHours(startDate.getHours() - 48))
			if (currentDate.getTime() <= modifiedStartDate.getTime()) {
				collection.remove({ reservation_id: parseInt(req.params.id) }, function (err, reservation) {
					if (err) throw err;
					return res.json(reservation);
				});
			} else {
				return res.json({ "message": "the reservation is within 48 hours" });
			}
		}
	})
});

module.exports = router;
