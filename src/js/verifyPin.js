verifyPin = (req, res) => {
    let pin = req.query.digits.slice(1, -1)
    if (pin.length === 6 && pin.startsWith(560)) {
        pincode = pin;
        // res.sendStatus(200);
        res.send(pincode).status(200);
        return pincode
    } else
        res.sendStatus(404);
}

module.exports = verifyPin;