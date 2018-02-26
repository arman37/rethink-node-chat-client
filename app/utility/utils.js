/**
 *
 * @author arman
 * @since 11/29/17
 *
 */
'use strict';

import moment from 'moment';

export default {
  setToken: token => localStorage.setItem('token', token),

  getToken: () => localStorage.getItem('token'),

  removeToken: () => localStorage.removeItem('token'),

  parseJwt: (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  },

  toMomentCalendarDate: (date) => {
    let otherDates = moment(date).fromNow();
    let cb = () => {
      return '['+otherDates+']';
    };

    return (
      moment(date).calendar(null,
          {
            sameDay: '[Today] LT',
            nextDay: '[Tomorrow] LT',
            nextWeek: 'MMM DD, YYYY LT',
            lastDay: '[Yesterday] LT',
            lastWeek: 'MMM DD, YYYY LT',
            sameElse: 'MMM DD, YYYY LT'
          })
    );
  }
}