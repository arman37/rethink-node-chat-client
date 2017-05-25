/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import MessageList from './message-list.component';

const Messages = ({state, newMessage, handleMessageSend, handleChange, currentRoom}) => (
  <div className="messages">
    <MessageList
      state={state}
      currentRoom={currentRoom} />
    <div className="chat__box">
      <div className="type__box">
        <TextField
          rows={2}
          value={newMessage}
          required={true}
          fullWidth={true}
          floatingLabelText={`type and press enter to send message to room: ${currentRoom && currentRoom.name}`}
          floatingLabelStyle={{color: 'blue'}}
          floatingLabelFocusStyle={{color: 'green'}}
          onChange={handleChange.bind(null, 'newMessage')}
          onKeyPress={handleMessageSend} />
      </div>
    </div>
  </div>
);

export default Messages;