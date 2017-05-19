/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';

const Logo = () => (
  <Paper className="app-logo-wrapper" zDepth={0}>
    <img src="./images/chat_ico.png" height="90" width="130"/>
  </Paper>
);

export default Logo;