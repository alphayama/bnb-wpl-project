var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	// available: {
    //     type: Boolean,
    //     required: true
    // },
	host: {
        type: String,
        required: true
    },
	property_name: {
        type: String,
        required: true
    },
	location: {
        type: String,
        required: true
    },
	description: {
        type: String,
        required: false
    },
	night_fee: {
        type: Number,
        required: false
    },
	cleaning_fee: {
        type: Number,
        required: false
    },
	service_fee: {
        type: Number,
        required: false
    },
	bedrooms: {
        type: Number,
        required: false
    },
	amenities: [{
		type: String
	}],
	img:
	{
		data: Buffer,
		contentType: String
	}
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model('Image', imageSchema);





// Step 5 - set up multer for storing uploaded files
 
var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });
