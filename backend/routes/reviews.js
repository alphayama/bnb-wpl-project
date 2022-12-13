var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/travelite');
var collection = db.get('reviews');

// Gets a list of reviews. Optional userid query filters reviews for the given user id
router.get('/', function (req, res) {
    let userid = req.query.userid;
    let propertyid = req.query.propertyid;
    if (userid != undefined && (userid != null || userid != "")) {
        collection.find({ user_id: parseInt(userid) }, function (err, reviews) {
            if (err) throw err;
            res.json(reviews);
        });
    }
    else if (propertyid != undefined && (propertyid != null || propertyid != "")) {
        collection.find({ property_id: parseInt(propertyid) }, function (err, reviews) {
            if (err) throw err;
            res.json(reviews);
        });
    }
    else {
        collection.find({}, function (err, reviews) {
            if (err) throw err;
            res.json(reviews);
        });
    }
});

// Gets a list of reviews with the given review_id
router.get('/:id', function (req, res) {
    console.log(req.params)
    collection.find({ _id: parseInt(req.params.id) }, function (err, review) {
        if (err) throw err;
        res.json(review);
    });
});

// Adds a new review
router.post('/', function (req, res) {
    
            collection.insert({
                user_id: req.body.user_id,
                property_id: req.body.property_id,
                comments: req.body.user_id,
                stars: req.body.stars
            }, function (err, review) {
                if (err) {
                    res.status(400)
                    return res.json({ "message": err });
                } else {
                    return res.json(review)
                }
            });
    });

// Update an existing review
router.put('/:id', function (req, res) {
    //req.body is used to read form input
    collection.update({ _id: parseInt(req.params.id) },
        {
            $set: {
                user_id: req.body.user_id,
                property_id: req.body.property_id
            }
        }, function (err, review) {
            if (err) {
                res.status(400)
                res.json({ "message": err });
            } else {
                res.json(review)
            }
        });
});

// Delete a review
router.delete('/:id', function (req, res) {
    Properties.remove({ _id: parseInt(req.params.id) }, function (err, review) {
        if (err) throw err;
        res.json(review);
    });
});

module.exports = router;
