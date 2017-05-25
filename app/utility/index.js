/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import 'whatwg-fetch';

const API_URL = 'http://127.0.0.1:3030/api/v1';
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

let _checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
};

let _parseJSON = (response) => {
    return response.json()
};

let _extend = (obj, src) => {
  for (var key in src) {
    if (src.hasOwnProperty(key)) obj[key] = src[key];
  }
  return obj;
};

export default (config) => {
    let {url, method, body, header = {}} = config;
    header = _extend(API_HEADERS, header);
    console.log(`calling at: ${API_URL}/${url}`);
    return fetch(`${API_URL}/${url}`, {
        method: method,
        headers: header,
        body: body ? JSON.stringify(body) : null
    })
    .then(_checkStatus)
    .then(_parseJSON);
};