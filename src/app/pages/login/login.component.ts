// Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Services
import { AuthService } from '../../services/auth/auth.service';

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
              private authService: AuthService) { }

  // On Page Opening
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // Process user Login
  onlogin() {
    this.submitted = true;
    event.preventDefault();
    // If errors found in input form
    if (this.loginForm.invalid) {
      return;
    }
    const userData = this.loginForm.value;
    this.getLoginUser(userData);
  }

  // Validate user exists
  getLoginUser(userData) {
    this.authService.getLoginUser(userData)
      .subscribe((data: any) => {
      if (data.ok) {
        this.router.navigateByUrl('/chat');
        this.authService.writeUser(userData);
        this.loginForm.reset();
      } else {
        alert('Username / Password Incorrect or User does not exist');
      }
    });
  }

}
