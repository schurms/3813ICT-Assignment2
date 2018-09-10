// Modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../../../services/socket/socket.service';
import { ActivatedRoute, Params } from '@angular/router';
// Models
import { User } from '../../../../models/user.model';
import { Channel } from '../../../../models/channel.model';
import { Message } from '../../../../models/message.model';
// Services
import { AuthService } from '../../../../services/auth/auth.service';
import { ChannelService } from '../../../../services/channel/channel.service';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.css']
})
export class ChatroomWindowComponent implements OnInit, OnDestroy {

  channel: Channel;
  authUser: User;
  user: User;
  username: string;
  messages = [];
  message;
  messageChannelText;
  channelId;
  connection;
  chatroom;
  channels: Channel[];
  channelMessages: Message[];

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    private channelService: ChannelService,
    private authService: AuthService) { }

  // When entering this component
  ngOnInit() {
    this.channelId = this.route.snapshot.paramMap['id'];
    this.route.params
      .subscribe(
        (params: Params) => {
          this.channelId = params['id'];
        }
      );
    this.user = this.authService.readUser();
    this.username = this.user.name;
    this.getAuthUser(this.username);
    this.getChannelMessages(this.channelId);

    // Valid user found
    console.log('Session started for: ' + this.username);
    this.getChannel();

    // Subscribe to the Chat Service
    this.connection = this.socketService.getMessages()
      .subscribe(
        message => {

        // Add chat message to the message array each time you are pushed a message from the server
        this.messageChannelText = message;
        // Get Channel this message is for
        let messageChannel = this.messageChannelText.text.split('*')[1];
        // Get the front of the message less channel
        let messageText = this.messageChannelText.text.split('*')[0];
        this.getChannelMessages(this.channelId);
        // Remove channel from the message
        this.messageChannelText.text = messageText;
        // Only show messages for my current channel
        if (messageChannel === this.chatroom) {
          this.messages.push(message);
          this.message = '';
        }
      });
  }

  // Send a chat message back to the server
  sendMessage() {
    if ( typeof(this.channel) === 'undefined' ) {
      alert("Please select a channel");
      return
    } else {
      // Append channel so we know what channel this message is being sent from
      this.socketService.sendMessage(this.message + ' (' + this.username + ')' + '*' + this.channel.name);
      // Send message to Message History
      this.getChannelMessages(this.channelId);
      let msgHistory = {
        message: this.message,
        messagedate: Date(),
        userid: this.authUser.id,
        username: this.authUser.name,
        channelid: this.channel.id,
        channelname: this.channel.name,
      };
     this.writeMessage(msgHistory);

      this.message = '';
      return
    }
  }

  // Get details for the selected channel
  getChannel() {
    this.channelService.getChannel(this.channelId)
      .subscribe(
        data => {
          this.channel = data.channel;
          this.chatroom = this.channel.name;
          this.joinChannel();
        },
        err => console.log(err)
      );
  }

  getChannelMessages(id) {
    this.socketService.getChannelMessages(id)
      .subscribe(
        data => {
          this.channelMessages = data.messages;
        },
        err => console.log(err)
      );
  }

  writeMessage(msgHistory) {
    this.socketService.writeMessage(msgHistory)
      .subscribe((data: any) => {
        this.getChannelMessages(this.channelId);
        return true;
    });
  }

  // Validate user authority
  getAuthUser(name) {
    const user = { name: name };
    this.authService.getAuthUser(user)
      .subscribe((data: any) => {
        this.authUser = data;
      });
  }

  // Join Channel
  joinChannel() {
    let userNameTitleCase = this.username.charAt(0).toUpperCase() + this.username.toLowerCase().slice(1);
    let joinMessage = userNameTitleCase + " has joined the " + this.chatroom + " Channel*" + this.chatroom;
    this.socketService.joinChannel(joinMessage);
  }

  // Leave Channel
  // leaveChannel() {
  //   let userNameTitleCase = this.username.charAt(0).toUpperCase() + this.username.toLowerCase().slice(1);
  //   let leaveMessage = userNameTitleCase + " has left the " + this.chatroom + " Channel*" + this.chatroom;
  //   this.socketService.leaveChannel(leaveMessage);
  // }

  // When leaving this component close down the subscription
  ngOnDestroy() {
    // this.leaveChannel();
    if (this.connection) {
      this.connection.unsubscribe();
    }
  }

}

