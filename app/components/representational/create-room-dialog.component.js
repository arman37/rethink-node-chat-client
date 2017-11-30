/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

/**
 *
 * @param {boolean} createRoom
 * @param {function} toggleCreateRoomDialog
 * @param {function} handleChange
 * @param {function} handleRoomSubmit
 * @returns {XML}
 * @constructor
 */
const CreateRoom = ({createRoom, toggleCreateRoomDialog, handleChange, handleRoomSubmit}) => {
  let actions = [
    <FlatButton
      label="Cancel"
      secondary={true}
      onTouchTap={toggleCreateRoomDialog}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onTouchTap={handleRoomSubmit}
    />,
  ];

  return (
    <div>
      <Dialog
        title="Create a new room"
        actions={actions}
        modal={false}
        open={createRoom}
        onRequestClose={toggleCreateRoomDialog}
      >
        <TextField
          required={true}
          hintText="chat room name..."
          onChange={handleChange.bind(null, 'roomName')}/>
      </Dialog>
    </div>
  );
};

export default CreateRoom;