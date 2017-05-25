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
  constructor() {
    super(...arguments);
    this.state = {
      connectedUsers: [],
      chatRoomList: [],
      createRoom: false,
      roomName: '',
      progress: false,
      confirmOpen: false,
      confirmMessage: '',
      newMessage: '',
      currentRoom: {}
    };

    socket = io.connect('http://127.0.0.1:5000');

    socket.on('connection', () => {
      console.log('connection established');
    });

    socket.on('new-user-connection', (connectedUsers) => {
      this.updateConnectedUsers(Object.keys(connectedUsers).map((key) => (connectedUsers[key])));
    });

    socket.on('new-message', (message) => {
      this.updateMessageList(message);
    });
  }

  componentDidMount() {
    socket.emit('client-acknowledgement', this.props.location.state.id);
    this.getChatRoomList();
  }

  getChatRoomList() {
    $ajax({
      url: 'room',
      method: 'GET',
    })
    .then((chatRoomList) => {
      this.setState({chatRoomList, currentRoom: chatRoomList[0]});
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

  handleMessageSend(evt) {
    if(evt.key === 'Enter' && this.state.newMessage) {
      let data = {
        room: this.state.currentRoom.id,
        from: this.props.location.state.id,
        message: this.state.newMessage
      };

      $ajax({
        url: 'message',
        method: 'POST',
        body: data
      })
      .then((message) => {
        this.setState({newMessage: ''});
        console.log(message);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  updateMessageList(message) {
    if(this.state[message.room]) {
      this.setState({[message.room]: update(this.state[message.room], { $push: [message] })});
    }else {
      this.state[message.room] = [].push(message);
    }
  }

  setProgress(progress) {
    this.setState({progress});
  }

  showConfirmation(message) {
    this.setState({confirmOpen: true, confirmMessage: message});
    setTimeout(function () {
      this.setState({confirmOpen: false, confirmMessage: ''});
    }.bind(this), 4000);
  }

  handleRoomClick(room) {
    if(!this.state[room.id]) {
      $ajax({
        url: 'message',
        method: 'GET',
        header: {
          room: room.id
        }
      })
      .then((messages) => {
        this.setState({[room.id]: messages});
      })
      .catch((err) => {
        console.log(err);
      })
    }
    this.setState({currentRoom: room});
  }

  handleRoomSubmit() {
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
        state={this.state}
        progress={this.state.progress}
        newMessage={this.state.newMessage}
        createRoom={this.state.createRoom}
        currentRoom={this.state.currentRoom}
        confirmOpen={this.state.confirmOpen}
        chatRoomList={this.state.chatRoomList}
        confirmMessage={this.state.confirmMessage}
        connectedUsers={this.state.connectedUsers}
        handleChange={this.handleChange.bind(this)}
        handleRoomClick={this.handleRoomClick.bind(this)}
        handleRoomSubmit={this.handleRoomSubmit.bind(this)}
        handleMessageSend={this.handleMessageSend.bind(this)}
        handleCreateRoomOpen={this.handleCreateRoomOpen.bind(this)} />
    )
  }
}

export default MainContent;