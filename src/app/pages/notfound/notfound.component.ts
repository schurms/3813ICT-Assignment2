// Modules
import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  //Logout the user and go back to the Login component
  public logOut(): void {
    this.authService.deleteUser();
    console.log ('Session Cleared');
    this.router.navigateByUrl('login');
  }
}
