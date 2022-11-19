var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/travelite');
var collection = db.get('videos');

router.get('/', function(req, res) {
	collection.find({}, function(err, videos){
		if (err) throw err;
	  	res.json(videos);
	});
});

router.get('/:id', function(req, res) {
	collection.find({ _id: req.params.id }, function(err, video){
		if (err) throw err;
	  	res.json(video);
	});
});

//insert
router.post('/', function(req, res) {
	//req.body is used to read form input
	collection.insert({ 
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
	collection.update({_id: req.params.id },
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
	collection.remove({ _id: req.params.id }, function(err, video){
		if (err) throw err;
	  	res.json(video);
	});
});






module.exports = router;
