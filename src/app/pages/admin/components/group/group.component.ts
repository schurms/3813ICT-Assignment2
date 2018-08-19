import { Component, OnInit } from '@angular/core';
import {Group} from '../../../../models/group.model';
import {GroupService} from '../../../../services/group/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: Group[] = null;

  constructor(private groupService: GroupService) {
  }

  // On Page Opening
  ngOnInit() {
    this.getGroups();
  }

  // Get Groups
  getGroups() {
    this.groupService.getGroups()
      .subscribe(
        data => {
          this.groups = data.groups;
        },
        err => console.log(err)
      );
  }

  // Create Group
  createGroup(name){
    const group = {
      name: name,
      channel: ''
    };

    this.groupService.createGroup(group)
      .subscribe(
        data => {
          this.getGroups();
          return true;
        },
        err => console.log(err)
      );
  }

  // Update Group
  updateGroup(group){
    this.groupService.updateGroup(group)
      .subscribe(
        data => {
          this.getGroups();
          return true;
        },
        err => console.log(err)
      );
  }

  // Delete Group
  deleteGroup(group){
    this.groupService.deleteGroup(group)
      .subscribe(
        data => {
          this.getGroups();
          return true;
        },
        err => console.log(err)
      );
  }

}
