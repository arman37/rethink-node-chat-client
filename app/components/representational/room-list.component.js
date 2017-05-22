/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Progressbar from './progressbar.component';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const RoomList = ({progress, chatRoomList, handleCreateRoomOpen, handleRoomClick}) => (
  <div className="room__list">
    <span className="title">Chat Rooms</span>
    {
      progress && <Progressbar />
    }
    <List>
      {
        chatRoomList.map((room, index) => (
          <ListItem primaryText={room.name} rightIcon={<CommunicationChatBubble />} onClick={handleRoomClick.bind(null, room)} key={index} />
        ))
      }
    </List>
    <FloatingActionButton mini={true} onClick={handleCreateRoomOpen.bind(null, true)}>
      <ContentAdd />
    </FloatingActionButton>
  </div>
);

export default RoomList;