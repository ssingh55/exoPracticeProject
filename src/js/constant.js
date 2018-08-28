module.exports = {
    express : require('express'),
    app : express(),
    pathResolve : require('path').resolve,
    URI : "mongodb://exotel:exotel272@ds123372.mlab.com:23372/exotelfoodorder",
    mongoose : require('mongoose'),
    order : require(pathResolve('src/js/module')),
    PORT : process.env.PORT || 8080,
    config : {
        useNewUrlParser: true
    },
    foodType : require(pathResolve('src/js/foodType')),
    foodTypeOtherLocation : require(pathResolve('src/js/foodTypeOtherLocation')),
    foodData : require(pathResolve('src/js/foodData')),
    foodCancel : require(pathResolve('src/js/foodCancel')),
    verifyPin : require(pathResolve('src/js/verifyPin')),
    message : require(pathResolve('src/js/message')),
    smsStatus : require(pathResolve('src/js/smsStatus')),
    smsSend : require(pathResolve('src/js/smsSend')),
    pincode : ''}