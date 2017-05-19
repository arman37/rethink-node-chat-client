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

export default (config) => {
    const {url, method, body} = config;
    console.log(`calling at: ${API_URL}/${url}`);
    return fetch(`${API_URL}/${url}`, {
        method: method,
        headers: API_HEADERS,
        body: body ? JSON.stringify(body) : null
    })
    .then(_checkStatus)
    .then(_parseJSON);
};