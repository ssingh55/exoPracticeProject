require('request');

var sendData = 'https://<SID>:<ExotelToken>@api.exotel.com/v1/Accounts/<SID>/Sms/send/';

var checkStatus = 'https://<SID>:<ExotelToken>@api.exotel.com/v1/Accounts/<SID>/Sms/Messages/<Smsid>';

var connectTwoNum = 'https://<SID>:<Token>@api.exotel.com/v1/Accounts/<SID>/Calls/connect';

var connectNumToCallFlow = 'https://<SID>:<Token>@api.exotel.com/v1/Accounts/<SID>/Calls/connect';

var checkCallStatus = 'https://<SID>:<Token>@api.exotel.com/v1/Accounts/<SID>/Calls/<CallSID>';

