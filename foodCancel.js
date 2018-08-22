foodCancel = (orderModule, req, res) => {
    orderModule.findByIdAndUpdate(req.query.digits.slice(1, -1), {
        $set: {
            orderPlaced: false
        }
    }, (err, data) => {
        if (err || data == null || !data.orderPlaced) {
            console.log('inside foodcancel error block')
            res.sendStatus(404);
            return;
        }
        console.log(data, 'inside update block foodcancel');
        res.sendStatus(200);
    })
}

module.exports = foodCancel;