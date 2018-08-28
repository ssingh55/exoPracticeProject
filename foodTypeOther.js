foodTypeOther = async (foodModule, req, res) => {
    let x = {};
    await foodModule.find({}).then((data, err) => {
        if (err || data == null) {
            x = 0;
            return;
        }
        console.log('fetched the foodType successfully');
        x = Object.keys(data[0].foodName.toObject());
    })
    if (x == 0) {
        res.send('Error in connection to the foodType server')
        return;
    }
    // console.log(x);
    let y = "";
    for (let i = 2; i < 6; i++) {
        y += `Press ${i} for ${x[i]} `;
    }
    y += ' Press the key with #';
    res.type('text/plain');
    res.send(y)
}

module.exports = foodTypeOther;