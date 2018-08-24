msg = (orderModule, req, res) => {
    // console.log('inside api msg', req.query)
    orderModule.findOne({orderFrom: req.query.From}).sort({
        $natural: -1
    }).then((data) => {
        res.type('text/plain');
        res.send(`Order of ${data.orderType} from ${data.orderFrom} with order id ${data._id} has been placed`);
    })
}

greetMsg = (orderModule, req, res) => {
    console.log('inside api greetMsg');
    // console.log(req.query)
    orderModule.findOne({orderFrom: req.query.From}).sort({
        $natural: -1
    }).then((data) => {
        res.type('text/plain');
        res.send(`Thanks for placing the order. Order of ${data.orderType} with orderid ${data._id} has been placed`);
    })
}

cancelMsg = (orderModule) => {

}

module.exports = {
    msg,
    greetMsg,
    cancelMsg
}