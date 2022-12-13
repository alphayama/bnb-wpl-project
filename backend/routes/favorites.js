var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/travelite');
var collection = db.get('favorites');

// Gets a list of favorites. Optional userid query filters favorites for the given user id
router.get('/', function (req, res) {
    let userid = req.query.userid;
    let propertyid = req.query.propertyid;
    if (userid != undefined && (userid != null || userid != "")) {
        collection.find({ user_id: parseInt(userid) }, function (err, favorites) {
            if (err) throw err;
            res.json(favorites);
        });
    }
    else if (propertyid != undefined && (propertyid != null || propertyid != "")) {
        collection.find({ property_id: parseInt(propertyid) }, function (err, favorites) {
            if (err) throw err;
            res.json(favorites);
        });
    }
    else {
        collection.find({}, function (err, favorites) {
            if (err) throw err;
            res.json(favorites);
        });
    }
});

// Gets a list of favorites with the given favorite_id
router.get('/:id', function (req, res) {
    console.log(req.params)
    collection.find({ favorite_id: parseInt(req.params.id) }, function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
});

// Adds a new favorite
router.post('/', function (req, res) {
    collection.insert({
        user_id: req.body.user_id,
        property_id: req.body.property_id
    }, function (err, favorite) {
        if (err) {
            res.status(400)
            return res.json({ "message": err });
        } else {
            return res.json(favorite)
        }
    });
});

// Update an existing favorite
router.put('/:id', function (req, res) {
    //req.body is used to read form input
    collection.update({ favorite_id: parseInt(req.params.id) },
        {
            $set: {
                user_id: req.body.user_id,
                property_id: req.body.property_id
            }
        }, function (err, favorite) {
            if (err) {
                res.status(400)
                res.json({ "message": err });
            } else {
                res.json(favorite)
            }
        });
});

// Delete a favorite
router.delete('/:id', function (req, res) {
    Properties.remove({ _id: parseInt(req.params.id) }, function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
});

module.exports = router;
