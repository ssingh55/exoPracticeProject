msg = (orderModule, req, res) => {
    console.log('inside api msg', req.query.To)
    orderModule.findOne({}).sort({
        $natural: -1
    }).then((data) => {
        res.type('text/plain');
        res.send(`Order of ${data.orderType} from ${data.orderFrom} with order id ${data._id} has been placed`);
    })
}

greetMsg = (orderModule, req, res) => {
    orderModule.findOne({}).sort({
        $natural: -1
    }).then((data) => {
        res.type('text/plain');
        res.send(`Thanks for placing the order. Order of ${data.orderType} with orderid ${data._id} has been placed`);
    })
}

module.exports = {
    msg,
    greetMsg
}