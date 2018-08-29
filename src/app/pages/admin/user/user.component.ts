// Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
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

  originalRoles = ['','super', 'group'];
  roles: any = [];

  submitted = false;
  userForm: FormGroup;
  users: User[];
  user: User;
  authUser: User;
  username: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder) { }

  // On Page Opening validate user
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role:[''],
    });

    if(!sessionStorage.getItem('user')) {
      // No valid session is available
      this.authService.deleteUser();
      this.router.navigateByUrl('404');
    } else {
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
        this.authUser = data;
        if ((data.role.toUpperCase() === 'SUPER') || (data.role.toUpperCase() === 'GROUP')) {
          // Create role list dependent upon role as only Super can create other Supers
          if (data.role.toUpperCase() === 'SUPER') {
            this.roles = this.originalRoles;
          } else {
            // Filter out the Super role
            this.roles = this.originalRoles.filter(role => role.toUpperCase() != 'SUPER');
          }
          // If Authorised
          this.getUsers();
          return true;
        } else {
          // If not authorised
          this.location.back();
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
    // If errors found in input form
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
          // User Already Exists
          alert('Duplicate Users Can Not Be Created');
        }
      });
  }

  // Update existing User
  updateUser(user){
    if (this.authUser.role.toUpperCase() === "GROUP") {
      if (user.role.toUpperCase() === "SUPER") {
        alert("You are not authorised to create Super Users");
        return;
      }
    }
    this.userService.updateUser(user)
      .subscribe(
        data => {
          this.getUsers();
          return true;
        },
        err => console.log(err)
      );
  }

  //Determine if authorised to delete a user;
  deleteUser(nameDelete){
    const authUser = { name: this.user.name };
    this.authService.getAuthUser(authUser)
      .subscribe((data: any) => {
        if (data.role === 'super') {
          // If have the 'super' role then authorised to delete a user
          this.deleteAuthUser(nameDelete);
          return true;
        } else {
          alert('You are not authorised to delete a user');
        }
      });
  }

  // Delete a user
  deleteAuthUser(user){
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
