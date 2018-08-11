import { Component, OnInit } from '@angular/core';
import {Group} from '../../../../models/group.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groups: Group [] = [];
  group: Group;
  index: number;

  constructor() { }


  ngOnInit() {
    this.groups = [
      {id: '1', name: 'slslsl'},
      {id: '2', name: 'ssssssss'},
    ];
  }

}
