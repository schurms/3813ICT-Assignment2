import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiURL;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  submitted = false;
  signinForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private http: HttpClient) { }

  // Prior to page display
  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.signinForm.controls;
  }

  // Process user Signin
  public onSignin(): void {
    this.submitted = true;
    event.preventDefault();

    if (this.signinForm.invalid) {
      return;
    }

    const userData  = this.signinForm.value;
    this.http.post<{message: string}>(BACKEND_URL + '/api/signin/', userData)
      .subscribe((data: any) => {
        if (data.ok) {
          this.router.navigateByUrl('/chat');
          this.userService.writeUser(userData);
          this.signinForm.reset();
        } else {
          const errorBox = document.createElement('div');
          const errorText = document.createTextNode(data.errors.credentials);
          errorBox.className += 'alert alert-danger';
          errorBox.appendChild(errorText);
          document.getElementById('signinForm').appendChild(errorBox);
        }
      });
  }

}
