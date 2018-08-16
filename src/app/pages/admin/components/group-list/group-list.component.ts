import { Component, OnInit } from '@angular/core';
import {Group} from '../../../../models/group.model';
import {GroupService} from '../../../../services/group/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groups: Group[];
  group: Group;
  index: number;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.groups = this.groupService.getGroups();

    // this.groupService.getGroups()
    //   .subscribe((groupData) => {
    //     this.groups = groupData.groups;
    // });
  }

  deleteGroup(index: number) {
    this.groupService.deleteGroup(index);
  }
}
