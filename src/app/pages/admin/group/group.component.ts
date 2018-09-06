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
    if(!sessionStorage.getItem('user')) {
      // No valid session is available
      this.authService.deleteUser();
      this.router.navigateByUrl('404');
    } else {
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
        // Confirm only Super and Group users can enter admin page
        if ((data.role.toUpperCase() === 'SUPER') || (data.role.toUpperCase() === 'GROUP')) {
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
    // If errors found in input form
    if (this.groupForm.invalid) {
      return;
    }
    const groupData = this.groupForm.value;
    this.groupService.createGroup(groupData)
      .subscribe((data: any) => {
        // Test if data id is returned
        if (data._id) {
          this.getGroups();
          return true;
        } else {
          // Group Already Exists
          alert('Duplicate Groups Can Not Be Created');
        }
      });
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
          return true
        },
        err => console.log(err)
      );
  }

}
