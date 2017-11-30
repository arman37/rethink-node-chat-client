/**
 * @author arman
 * @since 11/30/17
 *
 */
'use strict';
import React from 'react';

const styles = {
  root: {
    textAlign: 'center'
  }
};
/**
 *
 * @param {string} title
 * @param {string} className
 * @constructor
 */
const Title = ({title, className}) => (
  <div className={className} style={styles.root}>{title}</div>
);

export default Title;