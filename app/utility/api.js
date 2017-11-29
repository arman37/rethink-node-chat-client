/**
 *
 * @author arman
 * @since 11/29/17
 *
 */
'use strict';

import $ajax from './ajax';
import utils from './utils';

/**
 * Handle user login.
 *
 * @param username
 * @param password
 * @returns {Promise.<TResult>}
 */
function handleLogin(username, password) {
  return (
    $ajax({
      url: 'users/actions/login',
      method: 'POST',
      body: {
        username: username,
        password: password
      }
    })
    .then(response => response)
    .catch((error) => {
      console.log(error);
      throw error;
    })
  );
}

export default {
  handleLogin
};