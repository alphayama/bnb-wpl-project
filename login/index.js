var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');


var monk = require('monk');
const { response } = require('express');
var db = monk('localhost:27017/vidzy');
var collection = db.get('users');



router.get('/', function(req, res) {
	res.render('index', { title: 'Express'} );

});

//protected route
router.get('/welcome', auth, function(req, res) {
	res.json({ message: "Welcome!!" } );

});


router.post('/register', function(req, res) {
	
	const {username, email, password } = req.body;

	if(!(username && email && password)){

		res.json( { error: "All fields are required!" } );
	}
	else{

		collection.findOne({ email: email }, function(err, user){
			if (err) throw err;

			if (user){
				res.json({ error : "User already exists. Please login!"} );

			}
			else{
				let newUser = {
					username,
					email,
					password

				}
				collection.insert(newUser, function(err, user){
					
                     if (err) throw err;
					 var token = jwt.sign({ user_id: user._id, email}, 'secretkey');

					 if (token){
						user.token = token;

					 }
					 res.json(user);

				})


			}


		});	

	}



});

router.post('/login', function(req, res) {
	const {email, password } = req.body;

	if(!(email && password)){

		res.json({ error: "All fields are required!" } );
	}
	else{

		collection.findOne({ email: email }, function(err, user){
			if (err) throw err;
			if(user == null){

				res.json({ error: "User doesn't exist" } );

			}
			else{
				if (user.password === password ){
					var token = jwt.sign({ user_id: user._id, email}, 'secretkey');
					user.token = token;
					res.json(user);

				}
				else{
					res.json( {error: "User email or password is incorrect!" } );

				}

			}

		});

	}

});




module.exports = router;
