const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

var User = new Schema({
	firstname: {
		type: String,
		default: false
	},
	lastname: {
		type: String,
		default: false
	},
	facebookId: String,
	admin: {
		type: Boolean,
		default: false
	}
})

User.plugin(passportLocalMongoose) //this plugin automatically includes username and password fields

module.exports = mongoose.model('User', User)