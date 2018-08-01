/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';

import React from 'react';
import RoomList from './room-list.component';
import UserList from './online-users.component';
import Messages from './messages.component';
import CreateRoom from './create-room-dialog.component';
import Confirmation from './confirmation.component';
import CallDialog from './call-dialog';

const MainContent = (props) => {
  let {
    state, progress, newMessage, chatRoomList, currentRoom, createRoom, handleChange, handleMessageSend, handleRoomClick, initiateCall,
    confirmOpen, confirmMessage, handleRoomSubmit, connectedUsers, toggleCreateRoomDialog, openCallDialog, toggleCallDialog, calleeName, hangup
  } = props;

  return (
    <div className="main__content">
      <div className="list__view">
        <UserList
          className='online__users'
          connectedUsers={connectedUsers}
          toggleCallDialog={toggleCallDialog} />
        <Messages
          state={state}
          className='messages'
          newMessage={newMessage}
          currentRoom={currentRoom}
          handleChange={handleChange}
          handleMessageSend={handleMessageSend} />
        <RoomList
          className='room__list'
          progress={progress}
          chatRoomList={chatRoomList}
          handleRoomClick={handleRoomClick}
          toggleCreateRoomDialog={toggleCreateRoomDialog} />
      </div>
      <CallDialog
        hangup={hangup}
        calleeName={calleeName}
        handleChange={handleChange}
        initiateCall={initiateCall}
        openCallDialog={openCallDialog}
        toggleCallDialog={toggleCallDialog} />
      <CreateRoom
        createRoom={createRoom}
        handleChange={handleChange}
        handleRoomSubmit={handleRoomSubmit}
        toggleCreateRoomDialog={toggleCreateRoomDialog} />
      <Confirmation
        confirmOpen={confirmOpen}
        confirmMessage={confirmMessage} />
    </div>
  );
};

export default MainContent;