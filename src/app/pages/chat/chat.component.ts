// Modules
import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Services
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {

    if(!sessionStorage.getItem('user')) {
      // No valid session is available
      this.authService.deleteUser();
      this.router.navigateByUrl('404');
    }
  }

}
