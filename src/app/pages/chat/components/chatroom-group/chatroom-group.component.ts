import { Component, OnInit } from '@angular/core';
import {Group} from '../../../../models/group.model';
import {GroupService} from '../../../../services/group/group.service';

@Component({
  selector: 'app-chatroom-group',
  templateUrl: './chatroom-group.component.html',
  styleUrls: ['./chatroom-group.component.css']
})
export class ChatroomGroupComponent implements OnInit {

  groups: Group[] = [];

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.groupService.getGroups()
      .subscribe(
        data => {
          this.groups = data.groups
        },
        err => console.log(err)
      );
  }



}
