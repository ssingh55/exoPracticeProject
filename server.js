const express = require('express');
const app = express();
const port = 3000;
const URI = "mongodb://exotel:exotel272@ds123562.mlab.com:23562/exoteltesting";
const orderModule = require('./model');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');

Mongoose.connect(URI, { useNewUrlParser: true }, () => {
    console.log('DB connected');
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world');
})

// app.get('/api/sms',(req,res)=>{
//     res.send('Your order with order id '+Date.now());
// })

app.get('/api/data', async (req, res) => {
    const bodyData = await req.query;
    // console.log(bodyData);
    orderDetails={};
    orderDetails.callFrom = bodyData.CallFrom;
    orderDetails.time = bodyData.CurrentTime;
    orderDetails.item = bodyData.digits;
    console.log(orderDetails);
    orderModule.create(orderDetails).then((data) => {
        res.send('ok');
    }).catch((e)=>{})
})

app.listen(port, () => console.log(`connected to port ${port}`));
