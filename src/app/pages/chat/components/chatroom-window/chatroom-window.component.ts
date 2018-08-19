import {Component, OnDestroy, OnInit} from '@angular/core';
import { SocketService } from '../../../../services/socket/socket.service';
import { Router } from '@angular/router';
import {LoginService} from '../../../../services/login/login.service';
import {User} from '../../../../models/user.model';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.css']
})
export class ChatroomWindowComponent implements OnInit, OnDestroy {

  user: User;
  username: string;
  messages = [];
  message;
  connection;

  constructor(
    private socketService: SocketService,
    private loginService: LoginService,
    private router: Router) {
  }

  // When entering this component
  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      // No valid session is available
      this.loginService.deleteUser();
      alert('Please Login In');
      this.router.navigateByUrl('login');

    } else {

      this.user = this.loginService.readUser();
      this.username = this.user.name;
      // Valid user found
      console.log('Session started for: ' + this.username);

      // Subscribe to the Chat Service
      this.connection = this.socketService.getMessages().subscribe(message => {

        // Add chat message to the message array each time you are pushed a message from the server
        this.messages.push(message);
        this.message = '';
      });
    }
  }

  // When leaving this component close down the subscription
  ngOnDestroy() {
    if (this.connection) {
      this.connection.unsubscribe();
    }
  }

}

// const post: Message = {id: null, title: 'tttt', content: 'tllsls'};
// this.http.post<{message: string}>('http://localhost:3000/api/messages', post)
//   .subscribe((responseData) => {
//     console.log(responseData.message);
//   });
// console.log(this.messageService.getMessages());
