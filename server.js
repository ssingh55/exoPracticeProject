const mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    port = 8080,
    URI = "mongodb://exotel:exotel272@ds123372.mlab.com:23372/exotelfoodorder",
    order = require('./model');

mongoose.connect(URI, { useNewUrlParser: true }, () => {
    console.log('DB connected')
})
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hello')
})


var request = require('request');

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body, ' inside callback');
    }
}

app.get('/api/foodType', async (req, res) => {
    let x = {};
    await order.foodType.find({}).then(data => {
        x = Object.keys(data[0].foodName.toObject());
    })
    console.log(x);
    var y = "";
    for (let i = 0; i < x.length; i++) {
        y += `Press ${i} for ${x[i]}. `;
    }
    y += 'Press the key with #';
    res.type('text/plain')
    res.send(y)
})

app.get('/api/msg', (req, res) => {
    console.log('inside api msg', req.query.To)
    order.orderModule.findOne({}).sort({ $natural: -1 }).then((data) => {
        var dataString = `From=${req.query.To}&To=07739063702&Body=${`Order of ${data.orderType} from ${data.orderFrom} with order id ${data._id}`}`;
        var options = {
            url: 'https://exotel272:0fcfd91af95c606f2c9e4a671aaf700fb9a3e13e@api.exotel.com/v1/Accounts/exotel272/Sms/send',
            method: 'POST',
            body: dataString
        };
        request(options, callback);

        res.type('text/plain');
        res.send(`Order of ${data.orderType} from ${data.orderFrom} with order id ${data._id}`);
    })
})

app.get('/api/greetMsg', (req, res) => {
    order.orderModule.findOne({}).sort({ $natural: -1 }).then((data) => {
        res.type('text/plain');
        res.send(`Thanks for placing the order. Order of ${data.orderType} with orderid ${data._id}`);
    })
})

app.get('/api/foodData', async (req, res) => {
    const bodyData = await req.query;
    // console.log(bodyData);
    orderDetails = {};
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
    // console.log(orderDetails);
    // res.sendStatus(200);
    order.orderModule.create(orderDetails).then((data) => {
        console.log('inside ordermodule')
        res.sendStatus(200);
    }).catch((e) => { })
})

app.get('/api/foodDataCancel', (req, res) => {
    order.orderModule.findByIdAndUpdate(req.query.id, { $set: { orderDetails: false } }, (callback, err) => {
        if (err)
            res.sendStatus(404)
        console.log(callback);
        res.sendStatus(200)
    });
})

app.get('/api/foodDataPincode', (req, res) => {
    order.orderModule.findByIdAndUpdate(req.query.id, { $set: { pincode: false } }, (callback, err) => {
        if (err)
            res.sendStatus(404)
        console.log(callback);
        res.sendStatus(200)
    });
})

app.listen(port, () => console.log(`Connected to port ${port}`));