/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  root: {
    width: '30%',
    margin: '10% auto 0 auto'
  },
  fields: {
    margin: '0 0 0 15%',
  },
  btn: {
    margin: '3% 0 2% 35%'
  }
};
/**
 *
 * @param {function} handleSubmit
 * @param {function} handleChange
 * @constructor
 */
const SignUpForm = ({handleSubmit, handleChange}) => (
  <Paper className="login-form-wrapper" zDepth={5} style={styles.root}>
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
          label="Submit"
          type="submit"
          style={styles.btn} /><br/>
    </form>
  </Paper>
);

export default SignUpForm;