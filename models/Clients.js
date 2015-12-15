var mongoose = require('mongoose');

var ClientShema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	dateBirth: Date,
	docNumber: String,
	phoneNumber: String,
    photo: String,
	orders:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
});

mongoose.model('Client', OrderShema);
