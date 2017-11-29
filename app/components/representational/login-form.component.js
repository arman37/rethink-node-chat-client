/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import Logo from './logo.component';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

/**
 *
 * @param {function} handleSubmit
 * @param {function} handleChange
 * @constructor
 */
const LoginForm = ({handleSubmit, handleChange}) => (
  <div>
    <Logo></Logo>
    <form onSubmit={handleSubmit.bind(null)}>
      <TextField
        hintText="typeAnythingAsUsername&Password@gmail.com"
        floatingLabelText="Username"
        autoFocus={true}
        required={true}
        onChange={handleChange.bind(null, 'username')}
        className="form-input-wrapper"
      /><br/>
      <TextField
        hintText=""
        floatingLabelText="Password"
        type="password"
        required={true}
        onChange={handleChange.bind(null, 'password')}
        className="form-input-wrapper"
      /><br/>
      <RaisedButton
        label="Login"
        type="submit"
        className="form-input-wrapper login-button"
      /><br/>
    </form>
  </div>
);

export default LoginForm;