var mongoose = require('mongoose');

var OrderShema = new mongoose.Schema({
	from: Date,
	to: Date,
	startLocation: String,
	finishLocation: String,
	addInfo: String,
	firstName: String,
	lastName: String,
	dateBirth: Date,
	docNumber: String,
	phoneNumber: String,
	car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car'}
});

mongoose.model('Order', OrderShema);
