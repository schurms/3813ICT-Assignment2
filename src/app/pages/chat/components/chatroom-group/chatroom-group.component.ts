// Modules
import { Component, OnInit } from '@angular/core';
// Models
import { Group } from '../../../../models/group.model';
import { User } from '../../../../models/user.model';
// Services
import { GroupService } from '../../../../services/group/group.service';
import { AuthService } from '../../../../services/auth/auth.service';
import {falseIfMissing} from 'protractor/built/util';

@Component({
  selector: 'app-chatroom-group',
  templateUrl: './chatroom-group.component.html',
  styleUrls: ['./chatroom-group.component.css']
})
export class ChatroomGroupComponent implements OnInit {

  user: User;
  username: string;
  groups: Group[];
  myGroups: Group[];

  constructor(
    private groupService: GroupService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.readUser();
    this.username = this.user.name;
    this.getGroups();
  }

  getGroups() {
    this.groupService.getGroups()
      .subscribe(
        data => {
          this.groups = data.groups;
          this.myGroups = this.getMyGroups(this.groups, this.username);
          console.log(this.groups);
          console.log(this.myGroups);
        },
        err => console.log(err)
      );
  }

  getMyGroups(groupArray, userGroup) {
    return groupArray.filter((obj) => {
      for (let i = 0, length = obj.user.length; i < length; i++) {
        if (obj.user[i].name === userGroup) {
          return true;
        }
      }
      return false;
    });
  }

}
