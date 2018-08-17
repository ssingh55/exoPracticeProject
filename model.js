const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderFrom: Number,
    time: String,
    orderPlaced: Boolean,
    orderType: String
});

const foodTypeSchema = new Schema({
    foodName: {
        Object
    }
}, { collection: 'foodType' })

const foodType = mongoose.model('foodType', foodTypeSchema);
const orderModule = mongoose.model('order', orderSchema);

module.exports = {
    orderModule,
    foodType
}