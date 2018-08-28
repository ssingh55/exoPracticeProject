const express = require('express'),
    app = express(),
    pathResolve = require('path').resolve,
    URI = "mongodb://exotel:exotel272@ds123372.mlab.com:23372/exotelfoodorder",
<<<<<<< HEAD
    order = require('./model');
||||||| merged common ancestors
    order = require('./model'),
    request = require('request');
=======
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
>>>>>>> b3ddae9bbace45e1520689336755b62ce7107bb5
let pincode = '';
<<<<<<< HEAD
mongoose.connect(URI, {
    useNewUrlParser: true
}, () => {
    console.log('DB connected')
})
app.use(bodyParser.urlencoded({
    extended: true
}));
||||||| merged common ancestors
mongoose.connect(URI, { useNewUrlParser: true }, () => {
    console.log('DB connected')
})
app.use(bodyParser.urlencoded({ extended: true }));
=======

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
>>>>>>> b3ddae9bbace45e1520689336755b62ce7107bb5

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
<<<<<<< HEAD
    console.log('inside foodtype', req.query.digits);
    console.log('verify pin', req.query.digits.slice(1, -1).length, req.query.digits.slice(1, -1).startsWith(560));
    if (req.query.digits.slice(1, -1).length === 6 && req.query.digits.slice(1, -1).startsWith(560)) {
        pincode = req.query.digits.slice(1, -1);
        res.sendStatus(200);
    } else
        res.sendStatus(404)
||||||| merged common ancestors
    console.log('inside foodtype', req.query.digits);
    console.log('verify pin', req.query.digits.slice(1, -1).length, req.query.digits.slice(1, -1).startsWith(560));
    if (req.query.digits.slice(1, -1).length === 6 && req.query.digits.slice(1, -1).startsWith(560)) {
        pincode = req.query.digits.slice(1, -1);
        res.sendStatus(200);
    }
    else
        res.sendStatus(404)
=======
    pincode = verifyPin(req, res);
    console.log(pincode)
>>>>>>> b3ddae9bbace45e1520689336755b62ce7107bb5
})

/*****api call for fetching the type of food available*******/
app.get('/api/foodType', (req, res) => {
    foodType(order.foodModule, req, res);
})

<<<<<<< HEAD
app.get('/api/msg', (req, res) => {
    console.log('inside api msg', req.query.To)
    order.orderModule.findOne({}).sort({
        $natural: -1
    }).then((data) => {
        res.type('text/plain');
        res.send(`Order of ${data.orderType} from ${data.orderFrom} with order id ${data._id} has been placed`);
    })
||||||| merged common ancestors
app.get('/api/msg', (req, res) => {
    console.log('inside api msg', req.query.To)
    order.orderModule.findOne({}).sort({ $natural: -1 }).then((data) => {
        res.type('text/plain');
        res.send(`Order of ${data.orderType} from ${data.orderFrom} with order id ${data._id} has been placed`);
    })
=======
/*****api call for fetching the type of food available for other pin code*******/
app.get('/api/foodTypeOtherLocation', (req, res) => {
    foodTypeOtherLocation(order.foodModule, req, res);
>>>>>>> b3ddae9bbace45e1520689336755b62ce7107bb5
})

<<<<<<< HEAD
app.get('/api/greetMsg', (req, res) => {
    order.orderModule.findOne({}).sort({
        $natural: -1
    }).then((data) => {
        res.type('text/plain');
        res.send(`Thanks for placing the order. Order of ${data.orderType} with orderid ${data._id} has been placed`);
    })
||||||| merged common ancestors
app.get('/api/greetMsg', (req, res) => {
    order.orderModule.findOne({}).sort({ $natural: -1 }).then((data) => {
        res.type('text/plain');
        res.send(`Thanks for placing the order. Order of ${data.orderType} with orderid ${data._id} has been placed`);
    })
=======
/*******api call for fetching the foodData*****/
app.get('/api/foodData', (req, res) => {
    console.log('hello world')
    foodData(order.orderModule, req, res, pincode);
>>>>>>> b3ddae9bbace45e1520689336755b62ce7107bb5
})

<<<<<<< HEAD
app.get('/api/foodData', async (req, res) => {
    const bodyData = await req.query;
    // console.log(bodyData);
    orderDetails = {};
    orderDetails._id = Date.now();
    orderDetails.pincode = pincode;
    orderDetails.orderFrom = bodyData.CallFrom;
    orderDetails.time = bodyData.CurrentTime;
    // bodyData.digits.charAt(1)
    if (bodyData.digits.split("").length !== 3) {
        console.log('in error block');
        res.sendStatus(404);
        return;
    }
    switch (bodyData.digits) {
        case '"0"':
            orderDetails.orderType = "vegburger";
            break;
        case '"1"':
            orderDetails.orderType = "nonvegburger";
            break;
        case '"2"':
            orderDetails.orderType = "vegpizza";
            break;
        case '"3"':
            orderDetails.orderType = "nonvegpizza";
            break;
        case '"4"':
            orderDetails.orderType = "muttonbiryani";
            break;
        case '"5"':
            orderDetails.orderType = "paneerbiryani";
            break;
        case '"6"':
            orderDetails.orderType = "chickenbiryani";
            break;
        case '"7"':
            orderDetails.orderType = "vegbiryani";
            break;
        case '"8"':
            orderDetails.orderType = "vegmeal";
            break;
        case '"9"':
            orderDetails.orderType = "nonvegmeal";
            break;
    }
    orderDetails.orderPlaced = true;
    console.log(orderDetails);
    // res.sendStatus(200);
    order.orderModule.create(orderDetails).then((data) => {
        console.log('inside ordermodule')
        res.sendStatus(200);
    }).catch((e) => {})
||||||| merged common ancestors
app.get('/api/foodData', async (req, res) => {
    const bodyData = await req.query;
    // console.log(bodyData);
    orderDetails = {};
    orderDetails._id = Date.now();
    orderDetails.pincode = pincode;
    orderDetails.orderFrom = bodyData.CallFrom;
    orderDetails.time = bodyData.CurrentTime;
    // bodyData.digits.charAt(1)
    if (bodyData.digits.split("").length !== 3) {
        console.log('in error block');
        res.sendStatus(404);
        return;
    }
    switch (bodyData.digits) {
        case '"0"':
            orderDetails.orderType = "vegburger";
            break;
        case '"1"':
            orderDetails.orderType = "nonvegburger";
            break;
        case '"2"':
            orderDetails.orderType = "vegpizza";
            break;
        case '"3"':
            orderDetails.orderType = "nonvegpizza";
            break;
        case '"4"':
            orderDetails.orderType = "muttonbiryani";
            break;
        case '"5"':
            orderDetails.orderType = "paneerbiryani";
            break;
        case '"6"':
            orderDetails.orderType = "chickenbiryani";
            break;
        case '"7"':
            orderDetails.orderType = "vegbiryani";
            break;
        case '"8"':
            orderDetails.orderType = "vegmeal";
            break;
        case '"9"':
            orderDetails.orderType = "nonvegmeal";
            break;
    }
    orderDetails.orderPlaced = true;
    console.log(orderDetails);
    // res.sendStatus(200);
    order.orderModule.create(orderDetails).then((data) => {
        console.log('inside ordermodule')
        res.sendStatus(200);
    }).catch((e) => { })
=======
/*****api call for order cancellation*******/
app.get('/api/foodCancel', (req, res) => {
    foodCancel(order.orderModule, req, res);
>>>>>>> b3ddae9bbace45e1520689336755b62ce7107bb5
})

<<<<<<< HEAD
app.get('/api/foodDataCancel', (req, res) => {
    console.log(parseInt(req.query.digits.slice(1, -1)));
    order.orderModule.findByIdAndUpdate(req.query.digits.slice(1, -1), {
        $set: {
            orderPlaced: false
        }
    }, (err, data) => {
        if (err || data == null || !data.orderPlaced) {
            console.log('inside error block')
            res.sendStatus(404);
            return;
        }
        console.log(data, 'inside update block cancel');
        res.type('text/plain');
        res.sendStatus(200);
    });
||||||| merged common ancestors
app.get('/api/foodDataCancel', (req, res) => {
    console.log(parseInt(req.query.digits.slice(1, -1)));
    order.orderModule.findByIdAndUpdate(req.query.digits.slice(1, -1), { $set: { orderPlaced: false } }, (err, data) => {
        if (err || data == null || !data.orderPlaced) {
            console.log('inside error block')
            res.sendStatus(404);
            return;
        }
        console.log(data, 'inside update block cancel');
        res.type('text/plain');
        res.sendStatus(200);
    });
=======
/*******api call for sms status*********/
app.get('/api/smsStatus', (req, res) => {
    smsStatus(req, res);
>>>>>>> b3ddae9bbace45e1520689336755b62ce7107bb5
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