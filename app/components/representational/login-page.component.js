/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import Header from './header.component';
import LoginForm from './login-form.component';

const LoginPage = ({handleSubmit, handleChange}) => (
  <div>
    <Header></Header>
    <LoginForm
      handleChange={handleChange}
      handleSubmit={handleSubmit} />
  </div>
);

export default LoginPage;