/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';
import React from 'react';
import Title from './title.component';
import utils from '../../utility/utils';
import {List, ListItem} from 'material-ui/List';
import Face from 'material-ui/svg-icons/action/face';

const styles = {
  root: {
    width: '20%',
    display: 'inline-block',
    float: 'left',
    borderStyle: 'inset'
  },
  self: {
    color: 'green'
  }
};

/**
 *
 * @param {array} connectedUsers
 * @param {string} className
 * @constructor
 */
const UserList = ({connectedUsers, className}) => {
  let userId = utils.parseJwt(utils.getToken()).id;

  return (
    <div className={className} style={styles.root}>
      <Title title='Online Users' className='online__users' />
      <List>
        {
          connectedUsers.map((user, index) => (
            <ListItem primaryText={
              <div>
                <span>{user.id === userId ? <span style={styles.self}>You({user.username})</span> : user.username}</span>
              </div>
            }
            leftIcon={<Face />} key={index} />
          ))
        }
      </List>
    </div>
  );
};

export default UserList;