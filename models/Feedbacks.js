var mongoose = require('mongoose');

var CarSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    text: String,
    approved: Boolean
});

mongoose.model('Feedback', CarSchema);
