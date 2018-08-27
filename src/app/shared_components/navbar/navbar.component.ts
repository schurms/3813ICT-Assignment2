// Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Models
import { User } from '../../models/user.model';
// Services
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;
  username: string;
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  // On Page Opening
  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
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
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      });
  }

  //Logout the user and go back to the Login component
  public logOut(): void {
    this.authService.deleteUser();
    console.log ('Session Cleared');
    this.router.navigateByUrl('login');
  }

}
