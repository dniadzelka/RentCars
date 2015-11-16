var mongoose = require('mongoose');

var CarSchema = new mongoose.Schema({
    model: String,
    year: Number,
    doors: Number,
    airConditioner: Boolean,
    autoTransmission: Boolean,
    vin: String,
    price: Number,
    image: String,
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
});

mongoose.model('Car', CarSchema);
