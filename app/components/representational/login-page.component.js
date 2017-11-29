/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import Header from './header.component';
import Paper from 'material-ui/Paper';
import LoginForm from './login-form.component';

/**
 *
 * @param {function} handleSubmit
 * @param {function} handleChange
 * @param {function} goToSignUpPage
 * @constructor
 */
const LoginPage = ({handleSubmit, handleChange, goToSignUpPage}) => (
  <div>
    <Header title='A RethinkDB chat application with React, NodeJS, HapiJS and socket.io' />
    <Paper className="login-form-wrapper" zDepth={5}>
      <LoginForm
        handleChange={handleChange}
        handleSubmit={handleSubmit} />
      <a style={{padding: '10px', marginLeft: '20px'}} href="" onClick={goToSignUpPage}>Don't have an account? Create one</a>
    </Paper>
  </div>
);

export default LoginPage;