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

  constructor(private groupService: GroupService) {
  }


  ngOnInit() {
    this.groups = this.groupService.readGroups();
  }


  onDelete(index: number) {
    this.groupService.deleteGroup(index);
  }
}
