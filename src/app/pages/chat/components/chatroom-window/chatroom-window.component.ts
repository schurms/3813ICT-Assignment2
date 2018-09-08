// Modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../../../services/socket/socket.service';
import { ActivatedRoute, Params } from '@angular/router';
// Models
import { User } from '../../../../models/user.model';
import { Channel } from '../../../../models/channel.model';
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
  messageText;
  messageChannel;
  channelId;
  connection;
  chatroom;

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

    // Valid user found
    console.log('Session started for: ' + this.username);
    this.getChannel();

    // Subscribe to the Chat Service
    this.connection = this.socketService.getMessages()
      .subscribe(
        message => {

        // Add chat message to the message array each time you are pushed a message from the server
        this.messageChannelText = message;
        this.messageChannel = this.messageChannelText.text.split('*').pop();
        this.messageText = this.messageChannelText.text.substr(0, this.messageChannelText.text.indexOf('*'));
        if (this.messageChannel === this.chatroom) {
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
      this.socketService.sendMessage(this.message + ' (' + this.username + ')' + ' Channel:*' + this.channel.name);

      // Send message to Message History
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
          this.joinChannel(this.chatroom);
        },
        err => console.log(err)
      );
  }

  joinChannel(channel) {
    this.socketService.joinChannel(channel);
  }

  writeMessage(msgHistory) {
    this.socketService.writeMessage(msgHistory)
      .subscribe((data: any) => {
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

  // When leaving this component close down the subscription
  ngOnDestroy() {
    if (this.connection) {
      this.connection.unsubscribe();
    }
  }

}

