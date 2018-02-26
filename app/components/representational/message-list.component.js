/**
 * @author arman
 * @since 5/23/17
 *
 */
'use strict';

import React from 'react';
import utils from '../../utility/utils';
import {List, ListItem} from 'material-ui/List';
import Face from 'material-ui/svg-icons/action/face';

const styles = {
  root: {
    width: '100%',
    height: '88%',
    overflowY: 'scroll'
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  time: {
    float: 'right'
  },
  self: {
    color: 'green'
  }
};

/**
 *
 * @param {object} state
 * @param {object} currentRoom
 * @param {string} className
 * @constructor
 */
const MessageList = ({state, currentRoom, className}) => {
  let userId = utils.parseJwt(utils.getToken()).id;

  return (
    <div className={className} style={styles.root}>
      <List>
        {
          state && state[currentRoom.id] && state[currentRoom.id].map((message, index) => (
            <ListItem 
              primaryText={
                <div>
                  <span style={styles.author}>{message.user.username}{message.user.id === userId ? <span style={styles.self}>(you)</span> : ''}: </span>
                  <span>{message.message}</span>
                  <span style={styles.time}>({utils.toMomentCalendarDate(message.createdAt)})</span>
                </div>
              }
              leftIcon={<Face />} key={index} />
          ))
        }
      </List>
    </div>
  );
};

export default MessageList;