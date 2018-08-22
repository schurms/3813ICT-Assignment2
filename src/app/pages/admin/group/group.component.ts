// Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Models
import { Group } from '../../../models/group.model';
import { User } from '../../../models/user.model';
// Services
import { GroupService } from '../../../services/group/group.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: Group[];
  user: User;
  username: string;

  constructor(
    private groupService: GroupService,
    private authService: AuthService,
    private router: Router) {
  }

  // On Page Opening validate user
  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      // No valid session is available
      this.authService.deleteUser();
      alert('Please login In');
      this.router.navigateByUrl('login');

    } else {

      // Valid session
      this.user = this.authService.readUser();
      this.username = this.user.name;
      this.getAuthUser(this.username);
    }

  }

  // Validate user authority
  getAuthUser(name){
    const user = { name: name };
    this.authService.getAuthUser(user)
      .subscribe((data: any) => {
        if ((data.name === 'super') || (data.role === 'group')) {
          this.getGroups();
          return true;
        } else {
          this.router.navigateByUrl('/chat');
          alert('You are not authorised to enter this page');
        }
      });
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
  createGroup(name) {
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
  updateGroup(group) {
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
  deleteGroup(group) {
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
