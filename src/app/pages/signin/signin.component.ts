import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import {MessageService} from '../../services/message/message.service';
import {HttpClient} from '@angular/common/http';
import {Message} from '../../models/message.model';

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
              private messageService: MessageService,
              private http: HttpClient) { }

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
    // this.http.post<{status: string}>('http://localhost:3000/api/message/', this.user)
    //   .subscribe((data) => {
    //     console.log(data.status);
          this.router.navigateByUrl('/chat');
          this.userService.writeUser(this.user);
          this.signinForm.reset();
      //   } else {
      //     console.log(data.status);
      //   }
      // });


    const post: Message = {id: null, title: 'tttt', content: 'tllsls'};
    this.http.post<{message: string}>('http://localhost:3000/api/messages', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
    // console.log(this.messageService.getMessages());
  }

}
