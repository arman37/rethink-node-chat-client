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
    left: 0,
    top: 0,
    width: '100%',
    height: '10%',
    position: 'absolute',
    textAlign: 'center'
  }
};
/**
 *
 * @param {string} title
 * @constructor
 */
const Header = ({title}) => (
  <Paper className="header__wrapper" zDepth={2} style={styles.root}>
    <h1>{title}</h1>
  </Paper>
);

export default Header;