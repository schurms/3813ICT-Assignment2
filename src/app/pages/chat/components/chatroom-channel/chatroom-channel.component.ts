// Modules
import { Component, OnInit } from '@angular/core';
// Models
import { Channel } from '../../../../models/channel.model';
import { User } from '../../../../models/user.model';
import { Group } from '../../../../models/group.model';
// Services
import { ChannelService } from '../../../../services/channel/channel.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { GroupService } from '../../../../services/group/group.service';

@Component({
  selector: 'app-chatroom-channel',
  templateUrl: './chatroom-channel.component.html',
  styleUrls: ['./chatroom-channel.component.css']
})
export class ChatroomChannelComponent implements OnInit {

  user: User;
  username: string;
  userid: number;
  channels: Channel[];
  groups: Group[];
  myGroups: Group[];
  myChannels: Channel[];

  constructor(
    private channelService: ChannelService,
    private groupService: GroupService,
    private authService: AuthService) {
  }

  // on Page Opening
  ngOnInit() {
    this.user = this.authService.readUser();
    this.username = this.user.name;
    this.getChannels();
  }

  // Get All Groups
  getGroups() {
    this.groupService.getGroups()
      .subscribe(
        data => {
          this.groups = data.groups;
          this.myGroups = this.getMyGroups(this.groups, this.username);
          this.getMyChannels(this.myGroups, this.userid);
        },
        err => console.log(err)
      );
  }

  // Filter returned Groups to Groups User Belongs To
  getMyGroups(groupArray, userGroup) {
    return groupArray.filter((obj) => {
      for (let i = 0, length = obj.user.length; i < length; i++) {
        if (obj.user[i].name.toUpperCase() === userGroup.toUpperCase()) {
          return true;
        }
      }
      return false;
    });
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
        if (obj.user[i].name.toUpperCase() === userChannel.toUpperCase()) {
          return true;
        }
      }
      return false;
    });
  }

}
