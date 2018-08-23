const express = require('express'),
    app = express(),
    URI = "mongodb://exotel:exotel272@ds123372.mlab.com:23372/exotelfoodorder",
    mongoose = require('mongoose'),
    order = require('./module'),
    PORT = 8080,
    options = {
        useNewUrlParser: true
    },
    foodType = require('./foodType'),
    foodTypeOther = require('./foodTypeOther'),
    foodData = require('./foodData'),
    foodCancel = require('./foodCancel'),
    verifyPin = require('./verifyPin'),
    message = require('./message'),
    smsStatus = require('./smsStatus'),
    smsSend = require('./smsSend');
let pincode = '';

/*********Mongoose connection****************/

mongoose.Promise = global.Promise;
mongoose.connect(URI, options, (err, conn) => {
        if (err) {
            return;
        }
        console.log('DB connected')
    })
    .catch(() => console.log('DB not connected'));


/********app routing**************/

app.get('/', (req, res) => {
    res.send('hello')
})

/********api call for msg*********/
app.get('/api/msg', (req, res) => {
    message.msg(order.orderModule, req, res);
})

/********api call for msg greet****************/
app.get('/api/greetMsg', (req, res) => {
    message.greetMsg(order.orderModule, req, res);
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
app.get('/api/foodTypeOther', (req, res) => {
    foodTypeOther(order.foodModule, req, res);
})

/*******api call for fetching the foodData*****/
app.get('/api/foodData', (req, res) => {
    foodData(order.orderModule, req, res);
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
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});