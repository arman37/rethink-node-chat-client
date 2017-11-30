/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import MessageList from './message-list.component';

const styles = {
  root: {
    width: '55%',
    height: '98%',
    marginLeft: '15px',
    borderStyle: 'inset',
    display: 'inline-block'
  },
  chatBox: {
    margin: '5px',
    borderStyle: 'inset'
  },
  typeBox: {
    width: '100%'
  }
};

/**
 *
 * @param {object} state
 * @param {string} newMessage
 * @param {function} handleMessageSend
 * @param {function} handleChange
 * @param {object} currentRoom
 * @param {string} className
 * @constructor
 */
const Messages = ({state, newMessage, handleMessageSend, handleChange, currentRoom, className}) => (
  <div className={className} style={styles.root}>
    <MessageList
      state={state}
      currentRoom={currentRoom}
      className='message__list' />
    <div className='chat__box' style={styles.chatBox}>
      <div className='type__box' style={styles.typeBox}>
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