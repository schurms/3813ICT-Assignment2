// Modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Models
import { Group } from '../../../../../models/group.model';
import { User } from '../../../../../models/user.model';
// Services
import { GroupService } from '../../../../../services/group/group.service';
import { UserService } from '../../../../../services/user/user.service';

@Component({
  selector: 'app-groupduser',
  templateUrl: './groupuser.component.html',
  styleUrls: ['./groupuser.component.css']
})
export class GroupuserComponent implements OnInit {

  group: Group;
  users: User[];
  submitted = false;
  userForm: FormGroup;
  groupId;
  userSelected:string;

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private userService: UserService,
              private location: Location,
              private formBuilder: FormBuilder) { }

  // On Page Opening
  ngOnInit() {
    // Set up Form Validators
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.getGroup();
    this.getUsers();
  }

  // Get details for the selected group
  getGroup(): void {
    this.groupId = +this.route.snapshot.paramMap.get('id');
    this.groupService.getGroup(this.groupId)
      .subscribe(
        data => {
          this.group = data.group;
        },
        err => console.log(err)
      );
  }

  // Get list of users available
  getUsers() {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data.users;
        },
        err => console.log(err)
      );
  }

  // Delete user
  deleteUser(id) {
    event.preventDefault();
    const userArray = this.group.user;
    // Remove the user out of local array
    this.group.user = userArray.filter(user => user.id != id);

    let group = this.group;
    // Update Group with new local array version
    this.updateGroup(group);
  }

  // Add a user to the Group
  addUser() {
    this.submitted = true;
    event.preventDefault();

    if (this.userForm.invalid) {
      return;
    }

    // Find id of selected user
    const userArray = this.users;
    const selectedUser = userArray.find(user => user.name.toUpperCase() == this.userSelected.toUpperCase());

    // Test if user already added
    const groupArray = this.group.user;
    const groupFound = groupArray.some(group => group.name.toUpperCase() == this.userSelected.toUpperCase());
    if (groupFound) {
      alert("Can Not Add The Same User to the Same Group");
    } else {
      // Create new User
      const addUser = {
        id: selectedUser.id,
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
      };

      // Push new User to Group
      this.group.user.push(addUser);
      let group = this.group;
      // Call Update Group route to update the group record
      this.updateGroup(group);
    }
  }

  // Update Group
  updateGroup(group) {
    this.groupService.updateGroup(group)
      .subscribe(
        data => {
          this.getGroup();
          return true;
        },
        err => console.log(err)
      );
  }

  // Return to Previous Page
  goBack() {
    this.location.back();
  }
}
