var mongoose = require('mongoose');

module.exports = mongoose.model('Contacts', {
	fname : String,
	lname : String,
	mobile : String,
	home : String,
	email : String,
	address : String,
	done : Boolean
});