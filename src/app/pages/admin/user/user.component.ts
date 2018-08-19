import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import {User} from '../../../models/user.model';
import {LoginService} from '../../../services/login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any;
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
      this.getUsers();
    }
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data
        },
        err => console.log(err)
        // () => console.log('Done Loading Users')
      );
  }


  createUser(name, email, role){
    const user = {
      name: name,
      email: email,
      role: role
    };


    this.userService.createUser(user)
      .subscribe(
        data => {
          this.getUsers();
          return true;
        },
        error => {
          console.error(error);
        }
      );

  }

  updateUser(user){
    this.userService.updateUser(user)
      .subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error =>{
        console.error('Error saving student');
      }
    )
  }

  deleteUser(user){
    this.userService.deleteUser(user)
      .subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error => {
        console.error('Error deleting user');
      }
    )
  }

}
