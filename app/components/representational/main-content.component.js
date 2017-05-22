/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';

import React from 'react';
import RoomList from './room-list.component';
import UserList from './user-list.component';
import CreateRoom from './create-room.component';
import Confirmation from './confirmation.component';

const MainContent = ({progress, chatRoomList, createRoom, handleChange, confirmOpen, confirmMessage, handleSubmit, connectedUsers, handleCreateRoomOpen}) => (
  <div className="main__content">
    <div>
      <UserList
        connectedUsers={connectedUsers} />
      <RoomList
        progress={progress}
        chatRoomList={chatRoomList}
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