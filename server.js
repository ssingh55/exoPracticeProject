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

app.get('/api/foodType', async (req, res) => {
    let x = {};
    await order.foodType.find({}).then(data => {
        x = Object.keys(data[0].foodName.toObject());
    })
    console.log(x);
    var y = "";
    for (let i = 0; i < x.length; i++) {
        y += `Press ${i + 1} for ${x[i]}. `;
    }
    y += 'Press the key with #';
    res.type('text/plain')
    res.send(y)
})

app.get('/api/foodData', async (req, res) => {
    const bodyData = await req.query;
    // console.log(bodyData);
    orderDetails = {};
    orderDetails.orderFrom = bodyData.CallFrom;
    orderDetails.time = bodyData.CurrentTime;
    // bodyData.digits.charAt(1)
    switch (bodyData.digits) {
        case '"1"':
            orderDetails.orderType = "vegburger";
            break;
        case '"2"':
            orderDetails.orderType = "nonvegburger";
            break;
        case '"3"':
            orderDetails.orderType = "vegpizza";
            break;
        case '"4"':
            orderDetails.orderType = "nonvegpizza";
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
    order.orderModule.create(orderDetails).then((data) => {
        console.log('inside ordermodule')
        res.send('ok');
    }).catch((e) => { })
})

app.listen(port, () => console.log(`Connected to port ${port}`));