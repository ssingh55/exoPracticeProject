const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const orderSchema = new Schema({
    _id: {
        type: String
    },
    pincode: Number,
    orderFrom: String,
    time: String,
    orderPlaced: Boolean,
    orderType: String,
});

const foodSchema = new Schema({
    foodName: {
        Object
    }
}, {
    collection: 'foodType'
});

const orderModule = mongoose.model('neworders', orderSchema),
    foodModule = mongoose.model('foodType', foodSchema);


module.exports = {
    orderModule,
    foodModule
}