/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import Header from './header.component';
import LoginForm from './login-form.component';

/**
 *
 * @param {function} handleSubmit
 * @param {function} handleChange
 * @constructor
 */
const LoginPage = ({handleSubmit, handleChange}) => (
  <div>
    <Header title='A RethinkDB chat application with React, NodeJS, HapiJS and socket.io' />
    <LoginForm
      handleChange={handleChange}
      handleSubmit={handleSubmit} />
  </div>
);

export default LoginPage;