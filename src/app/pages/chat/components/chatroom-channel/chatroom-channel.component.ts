// Modules
import { Component, OnInit } from '@angular/core';
// Models
import { Channel } from '../../../../models/channel.model';
import { User } from '../../../../models/user.model';
// Services
import { ChannelService } from '../../../../services/channel/channel.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-chatroom-channel',
  templateUrl: './chatroom-channel.component.html',
  styleUrls: ['./chatroom-channel.component.css']
})
export class ChatroomChannelComponent implements OnInit {

  user: User;
  username: string;
  channels: Channel[];
  myChannels: Channel[];

  constructor(
    private channelService: ChannelService,
    private authService: AuthService) {
  }

  // on Page Opening
  ngOnInit() {
    this.user = this.authService.readUser();
    this.username = this.user.name;
    this.getChannels();
  }

  // Get All Channels
  getChannels() {
    this.channelService.getChannels()
      .subscribe(
        data => {
          this.channels = data.channels;
          this.myChannels = this.getMyChannels(this.channels, this.username);
        },
        err => console.log(err)
      );
  }

  // Filter returned Channels to Channels User Belongs To
  getMyChannels(channelArray, userChannel) {
    return channelArray.filter((obj) => {
      for (let i = 0, length = obj.user.length; i < length; i++) {
        if (obj.user[i].name === userChannel) {
          return true;
        }
      }
      return false;
    });
  }


}
