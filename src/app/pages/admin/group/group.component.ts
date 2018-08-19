import { Component, OnInit } from '@angular/core';
import {Group} from '../../../models/group.model';
import {GroupService} from '../../../services/group/group.service';
import {User} from '../../../models/user.model';
import {LoginService} from '../../../services/login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: Group[] = null;
  user: User;
  username: string;

  constructor(
    private groupService: GroupService,
    private loginService: LoginService,
    private router: Router) {
  }

  // On Page Opening
  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      // No valid session is available
      this.loginService.deleteUser();
      alert('Please login In');
      this.router.navigateByUrl('login');

    } else {

      // Valid session
      this.user = this.loginService.readUser();
      this.username = this.user.name;
      this.getGroups();
    }

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
