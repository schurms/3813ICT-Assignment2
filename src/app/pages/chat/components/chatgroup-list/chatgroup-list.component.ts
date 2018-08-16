import { Component, OnInit } from '@angular/core';
import {Group} from '../../../../models/group.model';
import {GroupService} from '../../../../services/group/group.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chatgroup-list.component.html',
  styleUrls: ['./chatgroup-list.component.css']
})
export class ChatgroupListComponent implements OnInit {

  groups: Group[] = [];

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.groups = this.groupService.getGroups();

    // this.groupService.getGroups()
    //   .subscribe((groupData) => {
    //     this.groups = groupData.groups;
    //   });
  }

}
