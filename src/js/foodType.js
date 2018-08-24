foodType = async (foodModule, req, res) => {
    let foodTypeArray = [],
        errorDataFetch = false;
    // console.log('query', req.query);
    req.query = {};
    await foodModule.find(req.query).then((data, err) => {
        if (err || data.length === 0) {
            errorDataFetch = true;
            return;
        }
        console.log('fetched the foodType successfully');
        foodTypeArray = Object.keys(data[0].foodName.toObject());
    })
    // await errFetcher(errorDataFetch, res)
    // console.log(foodTypeArray);
    if (errorDataFetch) {
        res.type('text/plain');
        res.send('Error in connection to the foodType server')
        return;
    }
    let foodSpeechString = "";
    for (let i = 0; i < foodTypeArray.length; i++) {
        foodSpeechString += `Press ${i} for ${foodTypeArray[i]}. `;
    }
    foodSpeechString += ' Press the key with #';
    res.type('text/plain');
    res.send(foodSpeechString)
}

// errFetcher = (errorDataFetch, res) => {
//     if (errorDataFetch) {
//         res.type('text/plain');
//         res.send('Error in connection to the foodType server')
//         return;
//     }
// }

module.exports = foodType;