foodData = (orderModule, req, res, pincode) => {
    console.log(req.query); //getting the data fetched
    let dataFetchedLength = Object.getOwnPropertyNames(req.query).length;
    if (dataFetchedLength === 0) {
        console.log('Some issue is there in fetching the button clicked inside foodData');
        res.sendStatus(404);
        return;
    }
    const bodyData = req.query;
    buttonClicked = bodyData.digits.slice(1, -1);
    console.log('Successfully got the button clicked');
    if (Number(buttonClicked) < 0 || Number(buttonClicked) > 9) {
        console.log("inside foodData error block");
        res.sendStatus(404);
        return;
    }
    console.log('Creating the orderDetails');
    orderDetails = {};
    orderDetails._id = Date.now();
    orderDetails.pincode = pincode;
    orderDetails.orderFrom = bodyData.CallFrom;
    orderDetails.time = bodyData.CurrentTime;

    orderDetails.orderType = getOrderType(buttonClicked);
    orderDetails.orderPlaced = true;
    console.log(orderDetails);
    res.sendStatus(200);
    /*orderModule.create(orderDetails).then((data, err) => {
        if (err) {
            console.log("error inside db");
            return;
        }
        console.log('inside fooddata ordermodule');
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(404);
    })*/
}

function getOrderType(buttonClicked) {
    switch (buttonClicked) {
        case "0":
            return "vegburger";
            break;
        case "1":
            return "nonvegburger";
            break;
        case "2":
            return "vegpizza";
            break;
        case "3":
            return "nonvegpizza";
            break;
        case "4":
            return "muttonbiryani";
            break;
        case "5":
            return "paneerbiryani";
            break;
        case "6":
            return "chickenbiryani";
            break;
        case "7":
            return "vegbiryani";
            break;
        case "8":
            return "vegmeal";
            break;
        case "9":
            return "nonvegmeal";
            break;
    }
}

module.exports = foodData;