/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';
import React from 'react';
import Title from './title.component';
import {List, ListItem} from 'material-ui/List';
import Face from 'material-ui/svg-icons/action/face';

const styles = {
  root: {
    width: '20%',
    display: 'inline-block',
    float: 'left',
    borderStyle: 'inset'
  }
};

/**
 *
 * @param {array} connectedUsers
 * @param {string} className
 * @constructor
 */
const UserList = ({connectedUsers, className}) => (
  <div className={className} style={styles.root}>
    <Title title='Online Users' className='online__users' />
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