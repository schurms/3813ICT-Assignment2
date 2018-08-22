// Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  submitted = false;
  groupForm: FormGroup;

  constructor(
    private groupService: GroupService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  // On Page Opening validate user
  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

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
        if ((data.role === 'super') || (data.role === 'group')) {
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
  createGroup() {
    this.submitted = true;
    event.preventDefault();

    if (this.groupForm.invalid) {
      return;
    }

    const groupData = this.groupForm.value;
    this.groupService.createGroup(groupData)
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
