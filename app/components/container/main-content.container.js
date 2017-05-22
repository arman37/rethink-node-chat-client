/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import $ajax from '../../utility';
import update from 'react-addons-update';
import Main from '../representational/main-content.component';

let socket;

class MainContent extends React.Component {
  constructor(){
    super(...arguments);
    this.state = {
      connectedUsers: [],
      chatRoomList: [],
      createRoom: false,
      roomName: '',
      progress: false,
      confirmOpen: false,
      confirmMessage: '',
      currentRoom: {}
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
    this.getChatRoomList();
  }

  getChatRoomList () {
    $ajax({
      url: 'room',
      method: 'GET',
    })
    .then((chatRoomList) => {
      this.setState({chatRoomList});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  updateConnectedUsers(connectedUsers) {
    this.setState({connectedUsers})
  }

  handleCreateRoomOpen(createRoom) {
    this.setState({createRoom, roomName: ''});
  }

  handleChange(field, evt) {
    this.setState({[field]: evt.target.value});
  }

  setProgress(progress) {
    this.setState({progress});
  }

  showConfirmation(message) {
    this.setState({confirmOpen: true, confirmMessage: message});
  }

  handleRoomClick(room) {
    console.log(room);
    this.setState({currentRoom: room});
  }

  handleSubmit() {
    $ajax({
      url: 'room',
      method: 'POST',
      body: {
        name: this.state.roomName,
        created_by: this.props.location.state.id
      }
    })
    .then((room) => {
      let chatRoomList = update(this.state.chatRoomList, { $push: [room] });
      this.setState({chatRoomList});
      this.setProgress(false);
      this.showConfirmation(`Chat room ${room.name} has been created successfully.`);
    })
    .catch((err) => {
      console.log(err);
      this.setProgress(false);
      this.showConfirmation(`Oops! Chat room creation failed.`);
    });
    this.handleCreateRoomOpen(false);
    this.setProgress(true);
  }

  render() {
    return (
      <Main
        progress={this.state.progress}
        createRoom={this.state.createRoom}
        currentRoom={this.state.currentRoom}
        confirmOpen={this.state.confirmOpen}
        chatRoomList={this.state.chatRoomList}
        confirmMessage={this.state.confirmMessage}
        connectedUsers={this.state.connectedUsers}
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleRoomClick={this.handleRoomClick.bind(this)}
        handleCreateRoomOpen={this.handleCreateRoomOpen.bind(this)} />
    )
  }
}

export default MainContent;