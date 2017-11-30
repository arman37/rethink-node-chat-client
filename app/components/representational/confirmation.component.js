/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';

import React from 'react';
import Snackbar from 'material-ui/Snackbar';

/**
 *
 * @param {boolean} confirmOpen
 * @param {string} confirmMessage
 * @constructor
 */
const Confirmation = ({confirmOpen, confirmMessage}) => (
  <Snackbar
    open={confirmOpen}
    message={confirmMessage}
    autoHideDuration={4000}
  />
);

export default Confirmation;