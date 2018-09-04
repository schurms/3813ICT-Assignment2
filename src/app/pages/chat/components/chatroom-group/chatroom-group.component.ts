// Modules
import { Component, OnInit } from '@angular/core';
// Models
import { Group } from '../../../../models/group.model';
import { User } from '../../../../models/user.model';
// Services
import { GroupService } from '../../../../services/group/group.service';
import { AuthService } from '../../../../services/auth/auth.service';
import {Channel} from '../../../../models/channel.model';
import {MyChannels} from '../../../../models/mychannels.model';

@Component({
  selector: 'app-chatroom-group',
  templateUrl: './chatroom-group.component.html',
  styleUrls: ['./chatroom-group.component.css']
})
export class ChatroomGroupComponent implements OnInit {

  user: User;
  myUser: User;
  username: string;
  userid: number;
  groups: Group[];
  myGroups: Group[];
  myChannels: MyChannels[] = [];
  myChannel: MyChannels;
  myChannelId: number;
  myChannelName: string;


  constructor(
    private groupService: GroupService,
    private authService: AuthService) {
  }

  // On Page Opening
  ngOnInit() {
    this.user = this.authService.readUser();
    this.username = this.user.name;
    this.getAuthUser(this.username);
    // this.getGroups();
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

  getMyChannels(group, id) {
    let i;
    let j;
    let k;
    for (i = 0; i < group.length; i++) {
      for (j = 0; j < group[i].channel.length; j++) {
        for (k = 0; k < group[i].channel[j].user.length; k++) {
          if (group[i].channel[j].user[k].id === id) {
            this.myChannelId = group[i].channel[j].id;
            this.myChannelName = group[i].channel[j].name;
            const myChannel = new MyChannels(this.myChannelId, this.myChannelName);
            this.myChannels.push(myChannel);
          }
        }
      }
    }
  }

  // Validate user authority
  getAuthUser(name){
    const user = { name: name };
    this.authService.getAuthUser(user)
      .subscribe((data: any) => {
        this.myUser = data;
        this.userid = this.myUser.id;
        this.getGroups();
      });
  }

}
