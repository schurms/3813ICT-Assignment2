import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User;
  username: string;
  userrole: string;

  constructor(
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    if (!sessionStorage.getItem('username')) {
      // No valid session is available
      this.loginService.deleteUser();
      alert('Please login In');
      this.router.navigateByUrl('login');

    } else {

      //
      this.user = this.loginService.readUser();
      this.username = this.user.name;
      this.userrole = this.user.role;
      // Valid user found


    }


  }

  manageGroups() {
    this.router.navigateByUrl('/groups');
  }

  manageChannels() {
    this.router.navigateByUrl('/channels');
  }

  manageUsers() {
    this.router.navigateByUrl('/users');
  }
}
