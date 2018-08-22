import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {AuthService} from '../../services/auth/auth.service';

const BACKEND_URL = environment.apiURL;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private httpClient: HttpClient) { }

  // Prior to page display
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Process user Login
  public onlogin(): void {
    this.submitted = true;
    event.preventDefault();

    if (this.loginForm.invalid) {
      return;
    }

    const userData  = this.loginForm.value;
    this.httpClient.post(BACKEND_URL + '/api/login/', userData)
      .subscribe((data: any) => {
        if (data.ok) {
          this.router.navigateByUrl('/chat');
          this.authService.writeUser(userData);
          this.loginForm.reset();
        } else {
          const errorBox = document.createElement('div');
          const errorText = document.createTextNode("Username does not exist");
          errorBox.className += 'alert alert-danger';
          errorBox.appendChild(errorText);
          document.getElementById('loginForm').appendChild(errorBox);
        }
    });
  }

}
