import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

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
