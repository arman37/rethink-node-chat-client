/**
 * @author arman
 * @since 5/23/17
 *
 */
'use strict';

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Face from 'material-ui/svg-icons/action/face';

const MessageList = ({state, currentRoom}) => (
  <div className="message__list">
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