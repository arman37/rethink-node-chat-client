/**
 * @author arman
 * @since 5/10/17
 *
 */
'use strict';

import React from 'react';
import api from '../../utility/api'
import $ajax from '../../utility/ajax';
import update from 'react-addons-update';
import Main from '../representational/main-content.component';

let socket;
let yourConn;
let stream;
let conn;


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
      currentRoom: {},
      openCallDialog: false,
      calleeName: ''
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

    //connecting to our signaling server
    conn = new WebSocket('ws://localhost:9090');

    conn.onopen = function () {
      console.log("Connected to the signaling server");
    };

//when we got a message from a signaling server
    conn.onmessage = function (msg) {
      console.log("Got message", msg.data);

      var data = JSON.parse(msg.data);

      switch(data.type) {
        case "login":
          handleLogin(data.success);
          break;
        //when somebody wants to call us
        case "offer":
          handleOffer(data.offer, data.name);
          break;
        case "answer":
          handleAnswer(data.answer);
          break;
        //when a remote peer sends an ice candidate to us
        case "candidate":
          handleCandidate(data.candidate);
          break;
        case "leave":
          handleLeave();
          break;
        default:
          break;
      }
    };

    conn.onerror = function (err) {
      console.log("Got error", err);
    };

  }

  send(message) {
    conn.send(JSON.stringify(message));
  }

  componentDidMount() {
    socket.emit('client-acknowledgement', this.props.location.state.id);
    this.getChatRoomList();
  }

  getChatRoomList() {
    api
    .getChatRoomList()
    .then((chatRoomList) => {
      this.setState({chatRoomList, currentRoom: chatRoomList[0]});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  toggleCreateRoomDialog() {
    this.setState({ createRoom: !this.state.createRoom });
  }

  toggleCallDialog() {
    this.setState(() => ({ openCallDialog: !this.state.openCallDialog }), () => {
      if (this.state.openCallDialog) {
        let localVideo = document.querySelector('#localVideo');
        let remoteVideo = document.querySelector('#remoteVideo');
        //getting local video stream
        navigator.webkitGetUserMedia({ video: true, audio: true }, (myStream) => {
          stream = myStream;

          //displaying local video stream on the page
          localVideo.src = window.URL.createObjectURL(stream);

          //using Google public stun server
          var configuration = {
            "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
          };

          yourConn = new webkitRTCPeerConnection(configuration);

          // setup stream listening
          yourConn.addStream(stream);

          //when a remote user adds stream to the peer connection, we display it
          yourConn.onaddstream = (e) => {
            remoteVideo.src = window.URL.createObjectURL(e.stream);
          };

          // Setup ice handling
          yourConn.onicecandidate = (event) => {

            // if (event.candidate) {
            //   this.send({
            //     type: "candidate",
            //     candidate: event.candidate
            //   });
            // }
          };

        }, (error) => {
          console.log(error);
        });
      }
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
      let newRoom = [];
      newRoom.push(message);
      this.setState({[message.room]: newRoom});
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
    api
      .getMessage(room.id)
      .then((messages) => {
        this.setState({[room.id]: messages});
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({currentRoom: room});
  }

  handleRoomSubmit() {
    api
    .createNewRoom(this.state.roomName, this.props.location.state.id)
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
        openCallDialog={this.state.openCallDialog}
        confirmMessage={this.state.confirmMessage}
        connectedUsers={this.state.connectedUsers}
        handleChange={this.handleChange.bind(this)}
        handleRoomClick={this.handleRoomClick.bind(this)}
        handleRoomSubmit={this.handleRoomSubmit.bind(this)}
        handleMessageSend={this.handleMessageSend.bind(this)}
        toggleCallDialog={this.toggleCallDialog.bind(this)}
        handleCreateRoomOpen={this.handleCreateRoomOpen.bind(this)}
        toggleCreateRoomDialog={this.toggleCreateRoomDialog.bind(this)} />
    )
  }
}

export default MainContent;