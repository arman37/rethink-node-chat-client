/**
 *
 * @author arman
 * @since 11/29/17
 *
 */
'use strict';

export default {
  setToken: token => localStorage.setItem('token', token),

  getToken: () => localStorage.getItem('token'),

  removeToken: () => localStorage.removeItem('token'),

  parseJwt: (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}