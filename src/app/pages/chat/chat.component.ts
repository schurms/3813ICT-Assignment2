import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { Router} from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user: User;
  username:string;
  messages=[];
  message;
  connection;

  constructor(
    private socketService: SocketService,
    private userService: LoginService,
    private router: Router) { }

  // Before page is displayed
  ngOnInit() {
    if (!sessionStorage.getItem('username')) {
      //No valid session is available
      this.userService.deleteUser();
      alert('Please Sign In');
      this.router.navigateByUrl('signin');

    } else {

      this.user = this.userService.readUser();
      this.username = this.user.username;
      console.log('Session started for: ' + this.username);

      // Subscribe to the Chat Service
      this.connection = this.socketService.getMessages().subscribe(message => {

        //Add chat message to the message array each time you are pushed a message from the server
        this.messages.push(message);
        this.message = ""
      });
    }
  }

  sendMessage() {
    //Send a chat message back to the server
    this.socketService.sendMessage(this.message + ' (' + this.username + ')');
    this.message = '';
  }
  ngOnDestroy() {
    //When leaving this component close down the subscription
    if (this.connection) {
      this.connection.unsubscribe();
    }
  }
  logout() {
    //Logout the user and go back to the signin component

    this.userService.deleteUser();
    console.log ('Session Cleared');
    this.router.navigateByUrl('signin');
  }
}

