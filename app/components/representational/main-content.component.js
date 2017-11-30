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

const MainContent = (props) => {
  let {
    state, progress, newMessage, chatRoomList, currentRoom, createRoom, handleChange, handleMessageSend, handleRoomClick,
    confirmOpen, confirmMessage, handleRoomSubmit, connectedUsers, toggleCreateRoomDialog
  } = props;

  return (
    <div className="main__content">
      <div className="list__view">
        <UserList
          className='online__users'
          connectedUsers={connectedUsers} />
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