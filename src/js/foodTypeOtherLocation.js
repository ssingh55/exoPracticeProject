foodTypeOtherLocation = async (foodModule, req, res) => {
    let foodTypeObject = {},
        errorDataFetch = false;
    await foodModule.find(req.query).then((data, err) => {
        if (err || data == null) {
            errorDataFetch = true;
            return;
        }
        console.log('fetched the foodType successfully');
        foodTypeObject = Object.keys(data[0].foodName.toObject());
    })
    if (errorDataFetch) {
        res.type('text/plain');
        res.send('Error in connection to the foodType server').status(404)
        return;
    }
    // console.log(foodTypeObject);
    let foodSpeechString = "";
    for (let i = 2; i < 6; i++) {
        foodSpeechString += `Press ${i} for ${foodTypeObject[i]}. `;
    }
    foodSpeechString += ' Press the key with #';
    res.type('text/plain');
    res.send(foodSpeechString)
}

module.exports = foodTypeOtherLocation;