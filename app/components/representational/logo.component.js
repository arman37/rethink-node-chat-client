/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';

const styles = {
  root: {
    margin: '0 auto 0 auto',
    width: '30%'
  }
};

const Logo = () => (
  <Paper className="app__logo__wrapper" zDepth={0} style={styles.root}>
    <img src="./images/chat_ico.png" height="90" width="130"/>
  </Paper>
);

export default Logo;