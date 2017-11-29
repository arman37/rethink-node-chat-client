/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import Header from './header.component';
import SignUpForm from './signup-form.component';

/**
 *
 * @param {function} handleSubmit
 * @param {function} handleChange
 * @constructor
 */
const SignUpPage = ({handleSubmit, handleChange}) => (
  <div>
    <Header title='A RethinkDB chat application with React, NodeJS, HapiJS and socket.io' />
    <SignUpForm
      handleChange={handleChange}
      handleSubmit={handleSubmit} />
  </div>
);

export default SignUpPage;