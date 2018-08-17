const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const orderSchema = new Schema({
    callFrom: Number,
    time: String,
    item: String
});

const orderModule = Mongoose.model('order', orderSchema);

module.exports = orderModule;