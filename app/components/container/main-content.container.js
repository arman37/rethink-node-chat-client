/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';

let socket;

class MainContent extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      connectedUsers: [],
    };

    socket = io.connect('http://127.0.0.1:5000');

    socket.on('connection', () => {
      console.log('connection established');
    });

    socket.on('new-user-connection', (connectedUsers) => {
      this.updateConnectedUsers(Object.keys(connectedUsers).map((key) => (connectedUsers[key])));
    });

  }

  componentDidMount() {
    socket.emit('client-acknowledgement', this.props.location.state.id);
  }

  updateConnectedUsers(connectedUsers) {
    this.setState({connectedUsers})
  }

  render() {
    return (
      <div>
        hello...
        <ul>
          {
            this.state.connectedUsers.map((user) => (
              <li>{user.username}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default MainContent;