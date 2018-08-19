import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
  }

  //Logout the user and go back to the Login component
  public logOut(): void {
    this.loginService.deleteUser();
    console.log ('Session Cleared');
    this.router.navigateByUrl('login');
  }

}
