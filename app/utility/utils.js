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
}