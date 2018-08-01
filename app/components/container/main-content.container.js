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
import utils from '../../utility/utils';
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
      calleeName: '',
      caller: ''
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

    //when we got an ice candidate from a remote user
    socket.on('candidate', (data) => {
      yourConn.addIceCandidate(new RTCIceCandidate(data.candidate));
    });

    //create an answer to an offer
    socket.on('offer', (data) => {
      yourConn.setRemoteDescription(new RTCSessionDescription(data.offer));

      //create an answer to an offer
      yourConn.createAnswer((answer) => {
        yourConn.setLocalDescription(answer);

        this.send('answer', {
          answer: answer,
          caller: data.caller
        });

      }, (error) => {
        alert("Error when creating an answer");
      });

      this.setState({ caller: data.caller });
    });

    socket.on('answer', (data) => {
      yourConn.setRemoteDescription(new RTCSessionDescription(data.answer));
    });

    socket.on('leave', () => {
      this.handleLeave();
    });
  }

  send(type, message) {
    let callee = this.state.calleeName;
    if (callee) {
      message.callee = callee;
    }

    socket.emit(type, message);
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

  toggleCallDialog(calleeName) {
    this.setState(() => ({ openCallDialog: !this.state.openCallDialog, calleeName: calleeName || '' }), () => {
      if (this.state.openCallDialog) {
        let localVideo = document.querySelector('#localVideo');
        let remoteVideo = document.querySelector('#remoteVideo');
        //getting local video stream
        navigator.webkitGetUserMedia({ video: true, audio: true }, (myStream) => {
          stream = myStream;

          //displaying local video stream on the page
          localVideo.src = window.URL.createObjectURL(stream);

          //using Google public stun server
          let configuration = {
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
            if (event.candidate) {
              this.send('candidate', {
                caller: utils.parseJwt(utils.getToken()).username,
                candidate: event.candidate
              });
            }
          };

        }, (error) => {
          console.log(error);
        });
      }
    });
  }

  initiateCall() {
    let calleeName = this.state.calleeName;
    if (!!calleeName) {
      // create an offer
      yourConn.createOffer((offer) => {
        this.send('offer', {
          caller: utils.parseJwt(utils.getToken()).username,
          offer: offer
        });

        yourConn.setLocalDescription(offer);

      }, (error) => {
        alert("Error when creating an offer");
      });
    }
  }

  hangup() {
    this.send('leave', { name: this.state.calleeName || this.state.caller });
    this.handleLeave();
    this.toggleCallDialog();
  }

  handleLeave() {
    document.querySelector('#remoteVideo').src = null;
    yourConn.close();
    yourConn.onicecandidate = null;
    yourConn.onaddstream = null;

    this.setState({ calleeName: '', caller: '' });
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
    let { calleeName, progress, newMessage} = this.state;

    return (
      <Main
        state={this.state}
        calleeName={calleeName}
        progress={this.state.progress}
        newMessage={this.state.newMessage}
        createRoom={this.state.createRoom}
        currentRoom={this.state.currentRoom}
        confirmOpen={this.state.confirmOpen}
        chatRoomList={this.state.chatRoomList}
        openCallDialog={this.state.openCallDialog}
        confirmMessage={this.state.confirmMessage}
        connectedUsers={this.state.connectedUsers}
        hangup={this.hangup.bind(this)}
        initiateCall={this.initiateCall.bind(this)}
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