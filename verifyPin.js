verifyPin = (req, res) => {
    if (req.query.digits.slice(1, -1).length === 6 && req.query.digits.slice(1, -1).startsWith(560)) {
        pincode = req.query.digits.slice(1, -1);
        res.sendStatus(200);
        // res.send(pincode);
        return pincode
    } else
        res.sendStatus(404);
}

module.exports = verifyPin;