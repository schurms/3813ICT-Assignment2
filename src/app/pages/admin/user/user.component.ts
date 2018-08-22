// Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  roles = ['','super', 'group'];

  submitted = false;
  userForm: FormGroup;
  users: User[] = null;
  user: User;
  username: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  // On Page Opening validate user
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role:[''],
    });

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
        if ((data.role === 'super') || (data.role === 'group')) {
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
  createUser(){
    this.submitted = true;
    event.preventDefault();

    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value;
    this.userService.createUser(userData)
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
