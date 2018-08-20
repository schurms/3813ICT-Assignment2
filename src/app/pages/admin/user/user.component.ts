import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import {User} from '../../../models/user.model';
import {LoginService} from '../../../services/login/login.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

const BACKEND_URL = environment.apiURL;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = null;
  user: User;
  username: string;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      // No valid session is available
      this.loginService.deleteUser();
      alert('Please login In');
      this.router.navigateByUrl('login');

    } else {

      // Valid session
      this.user = this.loginService.readUser();
      this.username = this.user.name;
      this.getAuthUser(this.username);
    }
  }

  // Get User Data
  getUsers() {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data.users;
        },
        err => console.log(err)
      );
  }

  // Validate user authority
  getAuthUser(name){
    const user = { name: name };
    this.userService.getAuthUser(user)
      .subscribe((data: any) => {
        if ((data.name === 'super') || (data.role === 'group')) {
          this.getUsers();
        } else {
          this.router.navigateByUrl('/chat');
          alert('You are not authorised to enter this page');
        }
      });
  }

  // Create a new user
  createUser(name, email, role){
    const user = {
      name: name,
      email: email,
      role: role
    };
    this.userService.createUser(user)
      .subscribe((data: any) => {
        // Test if data id is returned
        if (data.id) {
          this.getUsers();
          return true;
        } else {

          // Else userid already exists
          alert('Userid already exists');
        }
      });
  }

  // Update existing User
  updateUser(user){
    this.userService.updateUser(user)
      .subscribe(
        data => {
          this.getUsers();
          return true;
        },
        err => console.log(err)
      );
  }

  // delete a user
  deleteUser(user){
    this.userService.deleteUser(user)
      .subscribe(
        data => {
          this.getUsers();
          return true;
        },
        err => console.log(err)
      );
  }

}
