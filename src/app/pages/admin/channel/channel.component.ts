import { Component, OnInit } from '@angular/core';
import { Channel } from '../../../models/channel.model';
import { ChannelService } from '../../../services/channel/channel.service';
import {User} from '../../../models/user.model';
import {LoginService} from '../../../services/login/login.service';
import {Router} from '@angular/router';

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
    private loginService: LoginService,
    private router: Router) { }

  // On Page Opening
  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      // No valid session is available
      this.loginService.deleteUser();
      alert('Please login In');
      this.router.navigateByUrl('login');

    } else {

      // Valid session
      this.user = this.loginService.readUser();
      this.username = this.user.name;
      this.getChannels();
    }
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
