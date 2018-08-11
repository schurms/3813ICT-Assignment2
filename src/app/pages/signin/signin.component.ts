import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import {MessageService} from '../../services/message/message.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User;
  submitted = false;
  signinForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.signinForm.controls;
  }

  public onSignin(): void {
    this.submitted = true;
    event.preventDefault();

    if (this.signinForm.invalid) {
      return;
    }

    this.user = this.signinForm.value;
    this.router.navigateByUrl('/chat');
    this.userService.writeUser(this.user);
    this.signinForm.reset();

    console.log(this.messageService.getMessages());
  }

}
