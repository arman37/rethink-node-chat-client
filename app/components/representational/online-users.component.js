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
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  root: {
    width: '20%',
    minHeight: '150px',
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
const UserList = ({connectedUsers, toggleCallDialog, className}) => {
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
                <RaisedButton label="Call" onTouchTap={toggleCallDialog.bind(null, user.username)} style={{marginLeft: '50px'}} />
              </div>
            }
            leftIcon={<Face />} key={index} />
          ))
        }
      </List>
      <div style={{display: "block", marginLeft: "10px", marginBottom: "10px"}}>
        <RaisedButton label="Initiate Call" onTouchTap={toggleCallDialog}/>
      </div>
    </div>
  );
};

export default UserList;