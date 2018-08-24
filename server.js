const express = require('express'),
    app = express(),
    pathResolve = require('path').resolve,
    URI = "mongodb://exotel:exotel272@ds123372.mlab.com:23372/exotelfoodorder",
    mongoose = require('mongoose'),
    order = require(pathResolve('src/js/module')),
    PORT = process.env.PORT || 8080,
    // bodyParser = require('body-parser'),
    config = {
        useNewUrlParser: true
    },
    foodType = require(pathResolve('src/js/foodType')),
    foodTypeOtherLocation = require(pathResolve('src/js/foodTypeOtherLocation')),
    foodData = require(pathResolve('src/js/foodData')),
    foodCancel = require(pathResolve('src/js/foodCancel')),
    verifyPin = require(pathResolve('src/js/verifyPin')),
    message = require(pathResolve('src/js/message')),
    smsStatus = require(pathResolve('src/js/smsStatus')),
    smsSend = require(pathResolve('src/js/smsSend'));
let pincode = '';

/*********Mongoose connection****************/

mongoose.Promise = global.Promise;
mongoose.connect(URI, config, (err, conn) => {
        if (err) {
            return;
        }
        console.log('DB connected')
    })
    .catch(() => console.log('DB not connected'));

/********app use body parser */
// app.use(bodyParser.urlencoded({ extended: true }));

/********app routing**************/

app.get('/', (req, res) => {
    res.send('hello')
})

/********api call for msg*********/
app.get('/api/message/msg', (req, res) => {
    message.msg(order.orderModule, req, res);
})

/********api call for msg greet****************/
app.get('/api/message/greetMsg', (req, res) => {
    message.greetMsg(order.orderModule, req, res);
})

/********api call for cancel msg****************/
app.get('/api/message/cancelMsg', (req, res) => {
    message.cancelMsg(order.orderModule, req, res);
})

/*****api call for pin verification*******/
app.get('/api/verifyPin', (req, res) => {
    pincode = verifyPin(req, res);
    console.log(pincode)
})

/*****api call for fetching the type of food available*******/
app.get('/api/foodType', (req, res) => {
    foodType(order.foodModule, req, res);
})

/*****api call for fetching the type of food available for other pin code*******/
app.get('/api/foodTypeOtherLocation', (req, res) => {
    foodTypeOtherLocation(order.foodModule, req, res);
})

/*******api call for fetching the foodData*****/
app.get('/api/foodData', (req, res) => {
    console.log('hello world')
    foodData(order.orderModule, req, res, pincode);
})

/*****api call for order cancellation*******/
app.get('/api/foodCancel', (req, res) => {
    foodCancel(order.orderModule, req, res);
})

/*******api call for sms status*********/
app.get('/api/smsStatus', (req, res) => {
    smsStatus(req, res);
})

/*******api call for sending sms*********/
app.get('/api/smsSend', (req, res) => {
    smsSend(req, res);
})

/******Running on port 8080******/
if (!module.parent) {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

/*******exporting express server app for testing *******/
module.exports = app;