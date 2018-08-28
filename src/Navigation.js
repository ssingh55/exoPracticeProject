import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/smssend">Click to send sms</NavLink>
            <NavLink to="/connecttwopersoncall">Click to connect call</NavLink>
            <NavLink to="/getsmsstatus">Click to get sms status</NavLink>
            <NavLink to="/getcallstatus">Click to get call status</NavLink>
        </div>
    )
}

export default Navigation;
