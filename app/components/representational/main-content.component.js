/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';

import React from 'react';
import RoomList from './room-list.component';
import UserList from './user-list.component';
import Messages from './messages.component';
import CreateRoom from './create-room.component';
import Confirmation from './confirmation.component';

const MainContent = ({progress, chatRoomList, currentRoom, createRoom, handleChange, handleRoomClick, confirmOpen, confirmMessage, handleSubmit, connectedUsers, handleCreateRoomOpen}) => (
  <div className="main__content">
    <div className="list__view">
      <UserList
        connectedUsers={connectedUsers} />
      <Messages
        currentRoom={currentRoom}
        handleChange={handleChange} />
      <RoomList
        progress={progress}
        chatRoomList={chatRoomList}
        handleRoomClick={handleRoomClick}
        handleCreateRoomOpen={handleCreateRoomOpen} />
    </div>
    <CreateRoom
      createRoom={createRoom}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCreateRoomOpen={handleCreateRoomOpen} />
    <Confirmation
      confirmOpen={confirmOpen}
      confirmMessage={confirmMessage} />
  </div>
);

export default MainContent;