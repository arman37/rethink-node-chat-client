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

/**
 * Handle user sign-up.
 *
 * @param username
 * @param password
 * @returns {Promise.<TResult>}
 */
function handleSignUp(username, password) {
  return (
    $ajax({
      url: 'users/actions/sign-up',
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

/**
 * get chat room list of user.
 *
 * @returns {Promise.<TResult>}
 */
function getChatRoomList() {
  return (
    $ajax({
      url: 'room',
      method: 'GET'
    })
    .then(response => response)
    .catch((error) => {
      console.log(error);
      throw error;
    })
  );
}

/**
 * Handle message send.
 *
 * @param username
 * @param password
 * @returns {Promise.<TResult>}
 */
function sendMessage(data) {
  return (
    $ajax({
      url: 'message',
      method: 'POST',
      body: data
    })
      .then(response => response)
      .catch((error) => {
        console.log(error);
        throw error;
      })
  );
}

/**
 * Get messages for a particular room.
 *
 * @param roomId
 * @returns {Promise.<TResult>}
 */
function getMessage(roomId) {
  return (
    $ajax({
      url: `message?roomId=${roomId}`,
      method: 'GET',
    })
    .then(response => response)
    .catch((error) => {
      console.log(error);
      throw error;
    })
  );
}

export default {
  handleLogin,
  handleSignUp,
  sendMessage,
  getMessage,
  getChatRoomList
};