const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true,
	},
	password: {
		type: String,
		trim: true,
		required: true,
	},
	role: {
		type: Number,
		trim: true,
		default: 0,
	},
});

// hash user password before saving into database
UserSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

module.exports = mongoose.model('User', UserSchema);
