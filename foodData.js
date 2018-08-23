foodData = async (orderModule, req, res) => {
    console.log(req.query);
    if (Object.getOwnPropertyNames(req.query).length === 0) {
        console.log('Some issue is there in fetching the button clicked inside foodData');
        res.sendStatus(404)
        return;
    }
    const bodyData = await req.query;
    console.log('Successfully got the button clicked options');
    console.log(bodyData.digits.split(""))
    if (bodyData.digits.split("").length !== 3) {
        console.log("inside foodData error block");
        res.sendStatus(404);
        return;
    }
    console.log('Creating the order');
    orderDetails = {};
    orderDetails._id = Date.now();
    pincode = 560001;
    orderDetails.pincode = pincode;
    orderDetails.orderFrom = bodyData.CallFrom;
    orderDetails.time = bodyData.CurrentTime;

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
    orderModule.create(orderDetails).then((data, err) => {
        console.log('inside fooddata ordermodule');
        res.sendStatus(200);
    }).catch((e) => {})
}

module.exports = foodData;