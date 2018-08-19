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
  message;
  connection;

  constructor(
    private socketService: SocketService,
    private loginService: LoginService) {
  }

  // When entering this component get the user name
  ngOnInit() {
    this.user = this.loginService.readUser();
    this.username = this.user.name;
  }

  // Send a chat message back to the server
  sendMessage() {
    this.socketService.sendMessage(this.message + ' (' + this.username + ')');
    this.message = '';
  }

}
