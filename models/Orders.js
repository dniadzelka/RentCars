var mongoose = require('mongoose');

var OrderShema = new mongoose.Schema({
	from: Date,
	to: Date,
	startLocation: String,
	finishLocation: String,
	car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car'}
});

mongoose.model('Order', OrderShema);
