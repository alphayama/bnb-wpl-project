var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/travelite');
var Properties = db.get('properties');
var Users = db.get('users');



router.get('/', function(req, res) {
	let host_id = req.query.host_id;
	if (host_id != undefined){
		Properties.find({ host:parseInt(host_id) }, function(err, video){
			if (err) throw err;
			  res.json(video);
		});
	} else{
		Properties.find({}, function(err, video){
			if (err) throw err;
			res.json(video);
		});
	}
});

router.get('/:id', function(req, res) {
	Properties.find({ property_id:parseInt( req.params.id) }, function(err, video){
		if (err) throw err;
	  	res.json(video);
	});
});

//insert
router.post('/', function(req, res) {
	//req.body is used to read form input
	Properties.insert({ 
		title: req.body.title,
		genre: req.body.genre,
		description:req.body.desc
	}, function(err, video){
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
	  	res.json(video);
	});
});

//update
router.put('/:id', function(req, res) {
	//req.body is used to read form input
	Properties.update({_id: req.params.id },
		{ $set: {
		title: req.body.title,
		genre: req.body.genre,
		description:req.body.desc }
	}, function(err, video){
		if (err) throw err;
		// if update is successfull, it will return updated object
	  	res.json(video);
	});
});

//delete
router.delete('/:id', function(req, res) {
	Properties.remove({ _id: req.params.id }, function(err, video){
		if (err) throw err;
	  	res.json(video);
	});
});






module.exports = router;
