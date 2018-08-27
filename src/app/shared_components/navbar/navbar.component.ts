// Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  // On Page Opening
  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
  }

  //Logout the user and go back to the Login component
  public logOut(): void {
    this.authService.deleteUser();
    console.log ('Session Cleared');
    this.router.navigateByUrl('login');
  }

}
