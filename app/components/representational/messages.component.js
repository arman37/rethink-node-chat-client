/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';

const Messages = ({handleChange, currentRoom}) => (
  <div className="messages">
    <div className="message__list">
      messages...
    </div>
    <div className="chat__box">
      <div className="type__box">
        <TextField
          rows={2}
          required={true}
          fullWidth={true}
          multiLine={true}
          floatingLabelText={`type and press enter to send message to room: ${currentRoom && currentRoom.name}`}
          floatingLabelStyle={{color: 'blue'}}
          floatingLabelFocusStyle={{color: 'green'}}
          onChange={handleChange.bind(null, 'roomName')}/>
      </div>
    </div>
  </div>
);

export default Messages;