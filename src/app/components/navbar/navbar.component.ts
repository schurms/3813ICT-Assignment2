import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  //Logout the user and go back to the signin component
  public logOut(): void {

    this.userService.deleteUser();
    console.log ('Session Cleared');
    this.router.navigateByUrl('signin');
  }

}
