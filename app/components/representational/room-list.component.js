/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';

import React from 'react';
import Title from './title.component';
import {List, ListItem} from 'material-ui/List';
import Progressbar from './progressbar.component';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const styles = {
  root: {
    width: '20%',
    float: 'right',
    borderStyle: 'inset',
    display: 'inline-block'
  }
};

/**
 *
 * @param {boolean} progress
 * @param {array} chatRoomList
 * @param {function} toggleCreateRoomDialog
 * @param {function} handleRoomClick
 * @param {string} className
 * @constructor
 */
const RoomList = ({progress, chatRoomList, toggleCreateRoomDialog, handleRoomClick, className}) => (
  <div className={className} style={styles.root}>
    <Title title='Chat Rooms' />
    {
      progress && <Progressbar />
    }
    <List>
      {
        chatRoomList
          .sort((roomA, roomB) => roomA.createdAt > roomB.createdAt)
          .map((room, index) => (
          <ListItem
            key={index}
            primaryText={room.name}
            rightIcon={<CommunicationChatBubble />}
            onClick={handleRoomClick.bind(null, room)} />
        ))
      }
    </List>
    <FloatingActionButton mini={true} onClick={toggleCreateRoomDialog}>
      <ContentAdd />
    </FloatingActionButton>
  </div>
);

export default RoomList;