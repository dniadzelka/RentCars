var mongoose = require('mongoose');

var OrderShema = new mongoose.Schema({
	from: String,
	to: String,
	startLocation: String,
	finishLocation: String,
	car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car'}
});

mongoose.model('Order', OrderShema);