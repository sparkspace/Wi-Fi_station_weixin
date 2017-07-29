var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var vacationSchema = mongoose.Schema({
    user: String,
    threshold: Number,
    rule: String,
});


var model = mongoose.model('model', vacationSchema);
module.exports = model;