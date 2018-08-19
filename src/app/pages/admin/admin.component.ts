import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User;
  username: string;

  constructor(
    private router: Router,
    private loginService: LoginService) { }

  // On Page Opening
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
    }

  }

  // Manage Groups Link
  manageGroups() {
    this.router.navigateByUrl('/groups');
  }

  // Manage Channels Link
  manageChannels() {
    this.router.navigateByUrl('/channels');
  }

  // Manage Users Link
  manageUsers() {
    this.router.navigateByUrl('/users');
  }
}
