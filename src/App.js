import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SmsSend from './smsSend';
import ConnectTwoPersonCall from './connectTwoPersonCall';
import Home from './home';
import GetSmsStatus from './getSmsStatus';
import GetCallStatus from './getCallStatus';
import Navigation from './Navigation';
import Error from './Error';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/smssend" component={SmsSend} />
            <Route path="/connecttwopersoncall" component={ConnectTwoPersonCall} />
            <Route path="/getsmsstatus" component={GetSmsStatus} />
            <Route path="/getcallstatus" component={GetCallStatus} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
