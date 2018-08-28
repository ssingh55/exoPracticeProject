import React, { Component } from 'react';
const request = require('request');

export default class GetSmsStatus extends Component {
    getSmsStatus(e) {
        { console.log('inside sms status') };
        console.log(this.refs);
        let smsId = this.refs.smsId.value;
        smsId = 'd290902397dded13def088bd7331d433';
        // let options = {
        //     url: 'https://exotel272:0fcfd91af95c606f2c9e4a671aaf700fb9a3e13e@api.exotel.com/v1/Accounts/exotel272/Calls/' + smsId,
        //     method: 'GET',
        // };
        let username = 'exotel272';
        let sidToken = '0fcfd91af95c606f2c9e4a671aaf700fb9a3e13e';
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.exotel.com/v1/Accounts/exotel272/SMS/Messages/" + smsId, true, username, sidToken);
        xhr.withCredentials = true;
        // xhr.onload = function () {
        //     console.log(xhr.responseText);
        //     console.log(xhr.status);
        // };
        xhr.onerror = function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('The data failed to load :(');
            console.log(JSON.stringify(XMLHttpRequest));
        };
        xhr.onload = function () {
            console.log('SUCCESS!');
        }
        xhr.send();
    }
    render() {
        return (
            <div className="getSmsStatus" >
                <input type="text" placeholder="Enter the call id" ref="smsId" />
                <button onClick={this.getSmsStatus.bind(this)}>Get status</button>
            </div>
        );
    }
}