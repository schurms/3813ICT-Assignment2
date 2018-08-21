// Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private channelService: ChannelService,
    private authService: AuthService,
    private router: Router) { }

  // On Page Opening validate user
  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      // No valid session is available
      this.authService.deleteUser();
      alert('Please login In');
      this.router.navigateByUrl('login');

    } else {

      // Valid session
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
        if ((data.name === 'super') || (data.role === 'group')) {
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
  createChannel(name){
    const channel = {
      name: name,
    };
    this.channelService.createChannel(channel)
      .subscribe(
        data => {
          this.getChannels();
          return true;
        },
        err => console.log(err)
      );
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
