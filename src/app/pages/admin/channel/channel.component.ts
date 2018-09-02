// Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Models
import { Channel } from '../../../models/channel.model';
import { User } from '../../../models/user.model';
// Services
import { ChannelService } from '../../../services/channel/channel.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  channels: Channel[] = null;
  user: User;
  username: string;
  submitted = false;
  channelForm: FormGroup;

  constructor(
    private channelService: ChannelService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  // On Page Opening validate user
  ngOnInit() {
    this.channelForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    if(!sessionStorage.getItem('user')) {
      // No valid session is available
      this.authService.deleteUser();
      this.router.navigateByUrl('404');
    } else {
      this.user = this.authService.readUser();
      this.username = this.user.name;
      this.getAuthUser(this.username);
    }
  }

  // Validate user authority
  getAuthUser(name){
    const user = { name: name };
    this.authService.getAuthUser(user)
      .subscribe((data: any) => {
        if ((data.role.toUpperCase() === 'SUPER') || (data.role.toUpperCase() === 'GROUP')) {
          this.getChannels();
          return true;
        } else {
          this.router.navigateByUrl('/chat');
          alert('You are not authorised to enter this page');
        }
      });
  }

  // Get Channels
  getChannels() {
    this.channelService.getChannels()
      .subscribe(
        data => {
          this.channels = data.channels
        },
        err => console.log(err)
      );
  }

  // Create Channel
  createChannel() {
    this.submitted = true;
    event.preventDefault();

    if (this.channelForm.invalid) {
      return;
    }

    const channelData = this.channelForm.value;
    this.channelService.createChannel(channelData)
      .subscribe((data: any) => {
        // Test if data id is returned
        if (data._id) {
          this.getChannels();
          return true;
        } else {
          // Channel Already Exists
          alert('Duplicate Channels Can Not Be Created');
        }
      });
  }

  // Update Channel
  updateChannel(channel){
    this.channelService.updateChannel(channel)
      .subscribe(
        data => {
          this.getChannels();
          return true;
        },
        err => console.log(err)
      );
  }

  // Delete Channel
  deleteChannel(channel){
    this.channelService.deleteChannel(channel)
      .subscribe(
        data => {
          this.getChannels();
          return true;
        },
        err => console.log(err)
      );
  }

}
