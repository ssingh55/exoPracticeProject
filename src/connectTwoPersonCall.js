import React, { Component } from 'react';
const request = require('request');

export default class ConnectTwoPersonCall extends Component {
    constructor() {
        super();
        // this.connectCall.bind(this);
    }
    connectCall(e) {
        { console.log('inside send sms') };
        console.log(this.refs);
        let receiverNumber = this.refs.receiverNumber.value;
        let callerNumber = this.refs.callerNumber.value;
        // message = "This is a test message being sent using Exotel with a (hello) and (hi). If this is being abused, report to 08088919888";
        let exophoneNumber = this.refs.exophoneNumber.value;
        // exophoneNumber = 08039513192;
        let dataString = `From=${callerNumber}&To=${receiverNumber}&CallerId=${exophoneNumber}`;
        let options = {
            // url: 'https://exotel272:0fcfd91af95c606f2c9e4a671aaf700fb9a3e13e@api.exotel.com/v1/Accounts/exotel272/Calls/connect',
            url: 'https://exotel272:0fcfd91af95c606f2c9e4a671aaf700fb9a3e13e@api.exotel.com/v1/Accounts/exotel272/Calls/connect',
            method: 'POST',
            body: dataString
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
        request(options, callback);
    }
    render() {
        return (
            <div className="connectCall" >
                <input type="text" placeholder="Enter the exophone number" ref="exophoneNumber" />
                <input type="text" placeholder="Enter the receiver number" ref="receiverNumber" />
                <input type="text" placeholder="Enter the caller number" ref="callerNumber" />
                <button onClick={this.connectCall.bind(this)}>Connect call</button>
            </div>
        );
    }
}