/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Face from 'material-ui/svg-icons/action/face';

const UserList = ({connectedUsers}) => (
  <div className="online__users">
    <span className="title">Online Users</span>
    <List>
      {
        connectedUsers.map((user, index) => (
          <ListItem primaryText={user.username} leftIcon={<Face />} key={index} />
        ))
      }
    </List>
  </div>
);

export default UserList;