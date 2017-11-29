/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import 'whatwg-fetch';
import config from './config';
import utils from './utils';

const API_URL = `${config.host}/${config.api_version}`;
let _getHeader = (token) => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

let _checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw response;
  }
};

let _parseJSON = (response) => {
  return response.json();
};

let _parseError = (error) => {

  if (error.json) {
    return (
      error
        .json()
        .then((res)=>{
          throw res;
        })
    );
  }

  throw error;
};

/**
 *
 * @param {object} config
 * @returns {Promise.<TResult>}
 */
export default (config) => {

  const {url, method = 'GET', body} = config;

  return (
    fetch(`${API_URL}/${url}`, {
      method: method,
      headers: _getHeader(utils.getToken()),
      body: body ? JSON.stringify(body) : null
    })
    .then(_checkStatus)
    .then(_parseJSON)
    .catch(_parseError)
    .catch((error) => {
      console.error(`An error occurred from api call to ${API_URL}/${url}, Error Message: ${error.message}`);
      throw error;
    })
  );
};