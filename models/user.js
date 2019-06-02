const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    timeFrom: String,
    timeTo: String,
    type: String,
    orders: Array
})

module.exports = mongoose.model('Doctor', doctorSchema);