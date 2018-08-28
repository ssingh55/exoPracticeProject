const request = require('request');

function callback(error, response, body) {
    console.log(response.statusCode)
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}
smsSend = (req, res) => {
    var dataString = `From=${req.query.CallTo}&To=${req.query.CallFrom}&Body=Hello World!`;
    var options = {
        url: "https://exotel272:0fcfd91af95c606f2c9e4a671aaf700fb9a3e13e@api.exotel.com/v1/Accounts/exotel272/Sms/send",
        headers: {'content-type':'application/x-www-form-urlencoded'},
        method: 'POST',
        body: dataString
    };
    request(options, callback);
}

module.exports = smsSend;