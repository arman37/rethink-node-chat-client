/**
 * @author arman
 * @since 5/23/17
 *
 */
'use strict';

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Face from 'material-ui/svg-icons/action/face';

const styles = {
  root: {
    width: '100%',
    height: '88%',
    overflowY: 'scroll'
  }
};

/**
 *
 * @param {object} state
 * @param {object} currentRoom
 * @param {string} className
 * @constructor
 */
const MessageList = ({state, currentRoom, className}) => (
  <div className={className} style={styles.root}>
    <List>
      {
        state && state[currentRoom.id] && state[currentRoom.id].map((message, index) => (
          <ListItem primaryText={`${message.user.username}: ${message.message} (at ${message.createdAt})`} leftIcon={<Face />} key={index} />
        ))
      }
    </List>
  </div>
);

export default MessageList;