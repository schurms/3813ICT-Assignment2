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
  user: User;
  username: string;
  messages = [];
  message;
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
    // Valid user found
    console.log('Session started for: ' + this.username);
    this.getChannel();

    // Subscribe to the Chat Service
    this.connection = this.socketService.getMessages()
      .subscribe(
        message => {

        // Add chat message to the message array each time you are pushed a message from the server
        this.messages.push(message);
        this.message = '';
        });
  }

  // Send a chat message back to the server
  sendMessage() {
    if ( typeof(this.channel) === 'undefined' ) {
      alert("Please select a channel");
      return
    } else {
      this.socketService.sendMessage(this.message + ' (' + this.username + ')' + ' ' + this.channel.name);
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
        },
        err => console.log(err)
      );
  }

  // When leaving this component close down the subscription
  ngOnDestroy() {
    if (this.connection) {
      this.connection.unsubscribe();
    }
  }

}

