// Modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../../../services/socket/socket.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Location } from '@angular/common';
// Models
import { User } from '../../../../models/user.model';
// Services
import { AuthService } from '../../../../services/auth/auth.service';
import { ChannelService } from '../../../../services/channel/channel.service';
import {Channel} from '../../../../models/channel.model';

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

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    private channelService: ChannelService,
    private authService: AuthService,
    private router: Router) { }

  // When entering this component
  ngOnInit() {

    if (!sessionStorage.getItem('user')) {
      // No valid session is available
      this.authService.deleteUser();
      alert('Please Login In');
      this.router.navigateByUrl('login');

    } else {
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
  }

  // Send a chat message back to the server
  sendMessage() {
    this.socketService.sendMessage(this.message + ' (' + this.username + ')' + ' ' + this.channel.name);
    this.message = '';
  }

  // Get details for the selected channel
  getChannel() {

    this.channelService.getChannel(this.channelId)
      .subscribe(
        data => {
          this.channel = data.channel;
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

