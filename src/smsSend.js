import React, { Component } from 'react';
const request = require('request-promise');
const btoa = require('btoa');

export default class SmsSend extends Component {
    sendSms() {
        console.log('inside send sms');
        console.log(this.refs);
        let receiverNumber = this.refs.receiverNumber.value;
        let message = this.refs.message.value;
        // message = "This is a test message being sent using Exotel with a (hello) and (hi). If this is being abused, report to 08088919888";
        let exophoneNumber = this.refs.exophoneNumber.value;
        // exophoneNumber = 08039513192;
        let dataString = `From=${exophoneNumber}&To=${receiverNumber}&Body=${message}`;
        console.log(receiverNumber, message, exophoneNumber);
        let username = 'exotel272';
        let sidToken = '0fcfd91af95c606f2c9e4a671aaf700fb9a3e13e';
        var xhr = new XMLHttpRequest();
        // xhr.setRequestHeader("Authorization", 'Basic ' + btoa('exotel272:0fcfd91af95c606f2c9e4a671aaf700fb9a3e13e'));
        xhr.open("POST", "https://api.exotel.com/v1/Accounts/exotel272/Sms/send", true, username, sidToken);
        xhr.withCredentials = true;
        // xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://api.exotel.com/v1/Accounts/exotel272/Sms/send');
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // xhr.onload = function () {
        //     console.log(xhr.responseText);
        // };
        // xhr.onerror = function (XMLHttpRequest, textStatus, errorThrown) {
        //     console.log('The data failed to load :(');
        //     console.log(JSON.stringify(XMLHttpRequest));
        // };
        xhr.onload = function () {
            console.log('SUCCESS!');
        }
        xhr.send(dataString);
    }
    render() {
        return (
            <div className="sms">
                <input type="number" placeholder="Enter the exophone number" value='08039513192' ref="exophoneNumber" />
                <input type="number" placeholder="Enter the number" value='7739063702' ref="receiverNumber" />
                <textarea type="text" placeholder="Enter the message" value='hi' ref="message" />
                <button onClick={this.sendSms.bind(this)}>Send sms</button>
            </div>
        )
    }
}

/*
let url = 'https://api.exotel.com/v1/Accounts/exotel272/Sms/send';
let headers = new Headers(),
    username = 'exotel272',
    passwordtoken = '0fcfd91af95c606f2c9e4a671aaf700fb9a3e13e';
headers.append('Authorization', 'Basic ' + btoa(username + ':' + passwordtoken))
// headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/smssend');
// headers.append('Access-Control-Allow-Credentials', 'true');
// exotel272:0fcfd91af95c606f2c9e4a671aaf700fb9a3e13e
console.log(headers)
fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: headers
})*/

{/* <Link to={this.props.match.url + '/' + item._id}>
                                    {item.title}
                                </Link> */}