/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';

const Header = () => (
  <Paper className="header-wrapper" zDepth={2}>
    <h1>A RethinkDB chat application with React, NodeJS, HapiJS and socket.io</h1>
  </Paper>
);

export default Header;