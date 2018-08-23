// Modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// Models
import { Group } from '../../../../models/group.model';
import { User } from '../../../../models/user.model';
// Services
import { GroupService } from '../../../../services/group/group.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-groupdetail',
  templateUrl: './groupdetail.component.html',
  styleUrls: ['./groupdetail.component.css']
})
export class GroupdetailComponent implements OnInit {

  group: Group;
  users: User[] = null;

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private userService: UserService,
              private location: Location) { }

  // On Page Opening
  ngOnInit(): void {
    this.getGroup();
    this.getUsers();
  }

  // Get detail for the group
  getGroup(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.groupService.getGroup(id)
      .subscribe(
        data => {
          this.group = data.group;
          console.log(this.group.id, this.group.name);
        },
        err => console.log(err)
      );
  }

  // Get User Data
  getUsers() {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data.users;
        },
        err => console.log(err)
      );
  }

  // Return to previous page
  goBack(): void {
    this.location.back();
  }

}
