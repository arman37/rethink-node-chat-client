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

const styles = {
  root: {

  },
  fields: {
    margin: '0 0 0 15%',
  },
  loginBtn: {
    margin: '3% 0 2% 35%'
  }
};
/**
 *
 * @param {function} handleSubmit
 * @param {function} handleChange
 * @constructor
 */
const LoginForm = ({handleSubmit, handleChange}) => (
  <div>
    <Logo />
    <form onSubmit={handleSubmit.bind(null)}>
      <TextField
        hintText="typeAnythingAsUsername&Password@gmail.com"
        floatingLabelText="Username"
        autoFocus={true}
        required={true}
        style={styles.fields}
        onChange={handleChange.bind(null, 'username')} /><br/>
      <TextField
        hintText=""
        floatingLabelText="Password"
        type="password"
        required={true}
        style={styles.fields}
        onChange={handleChange.bind(null, 'password')} /><br/>
      <RaisedButton
        label="Login"
        type="submit"
        style={styles.loginBtn} /><br/>
    </form>
  </div>
);

export default LoginForm;