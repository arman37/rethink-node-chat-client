/**
 * @author arman
 * @since 7/31/2018
 *
 */
'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const CallDialog = ({openCallDialog, toggleCallDialog, handleChange, handleCallClick}) => {
  let actions = [
    <FlatButton
      label="Close"
      secondary={true}
      onTouchTap={toggleCallDialog}
    />
  ];

  return (
    <div>
      <Dialog
        title="Create a call"
        actions={actions}
        modal={true}
        open={openCallDialog}
        autoScrollBodyContent={true}
        onRequestClose={toggleCallDialog} >

        <div>
          <video id = "localVideo" autoPlay></video>
          <video id = "remoteVideo" autoPlay></video>
        </div>
        <TextField
          required={true}
          hintText="callee name..."
          onChange={handleChange.bind(null, 'calleeName')}/>
        <FlatButton
          label="Call"
          primary={true}
          keyboardFocused={true}
          onTouchTap={handleCallClick}
        />
        <FlatButton
          label="HangUp"
          primary={true}
          onTouchTap={handleCallClick}
        />
      </Dialog>
    </div>
  );
};

export default CallDialog;