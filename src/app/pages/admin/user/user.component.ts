// Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Models
import { User } from '../../../models/user.model';
// Services
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';

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
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  // On Page Opening validate user
  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      // No valid session is available
      this.authService.deleteUser();
      alert('Please login In');
      this.router.navigateByUrl('login');

    } else {

      // Valid session
      this.user = this.authService.readUser();
      this.username = this.user.name;
      this.getAuthUser(this.username);
    }
  }

  // Validate user authority
  getAuthUser(name){
    const user = { name: name };
    this.authService.getAuthUser(user)
      .subscribe((data: any) => {
        if ((data.name === 'super') || (data.role === 'group')) {
          this.getUsers();
          return true;
        } else {
          this.router.navigateByUrl('/chat');
          alert('You are not authorised to enter this page');
        }
      });
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
