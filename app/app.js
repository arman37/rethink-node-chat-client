/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginContainer from './components/container/login.container';
import SignUpContainer from './components/container/signup.container';
import MainContent from './components/container/main-content.container';

injectTapEventPlugin();

class App extends React.Component {
  render() {

    return (
      <MuiThemeProvider>
        <Router>
          <Switch>
            <Route exact name="login" path="/" component={LoginContainer} />
            <Route exact name="signup" path="/sign-up" component={SignUpContainer} />
            <Route exact name="main" path="/main" component={MainContent} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

// Render to index.html
ReactDOM.render(<App />, document.getElementById('root'));