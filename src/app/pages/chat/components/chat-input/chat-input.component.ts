import {Component, OnDestroy, OnInit} from '@angular/core';
import { SocketService } from '../../../../services/socket/socket.service';
import { Router} from '@angular/router';
import { LoginService } from '../../../../services/login/login.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  user: User;
  username: string;
  messages = [];
  newMessageText: string = ''
  connection;

  constructor(
    private socketService: SocketService,
    private userService: LoginService,
    private router: Router) {
  }

  // When entering this component
  ngOnInit() {
    this.user = this.userService.readUser();
    this.username = this.user.username;
    // Valid user found
    console.log('Session started for: ' + this.username);

    // Subscribe to the Chat Service
    this.connection = this.socketService.getMessages().subscribe(newMessageText => {

      //Add chat message to the message array each time you are pushed a message from the server
      this.messages.push(newMessageText);
      this.newMessageText = ""
    });
  }

  //Send a chat message back to the server
  submit(message: string): void {
    this.socketService.sendMessage(this.newMessageText + ' (' + this.username + ')');
    this.newMessageText = '';
  }
}
