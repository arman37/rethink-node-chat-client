/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';

/**
 *
 * @param {string} title
 * @constructor
 */
const Header = ({title}) => (
  <Paper className="header-wrapper" zDepth={2}>
    <h1>{title}</h1>
  </Paper>
);

export default Header;