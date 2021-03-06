// Modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators}  from '@angular/forms';
// Models
import { Channel } from '../../../../../models/channel.model';
import { User } from '../../../../../models/user.model';
// Services
import { ChannelService } from '../../../../../services/channel/channel.service';
import { UserService } from '../../../../../services/user/user.service';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-channeluser',
  templateUrl: './channeluser.component.html',
  styleUrls: ['./channeluser.component.css']
})
export class ChanneluserComponent implements OnInit {

  channel: Channel;
  users: User[];
  submitted = false;
  userForm: FormGroup;
  channelId;
  userSelected:string;

  constructor(private route: ActivatedRoute,
              private channelService: ChannelService,
              private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private location: Location,
              private formBuilder: FormBuilder) { }

  // On Page Opening
  ngOnInit() {
    // Set up Form Validators
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    if(!sessionStorage.getItem('user')) {
      // No valid session is available
      this.authService.deleteUser();
      this.router.navigateByUrl('404');
    } else {
      // Get initial Data
      this.getChannel();
      this.getUsers();
    }

  }

  // Get details for the selected channel
  getChannel(): void {
    this.channelId = +this.route.snapshot.paramMap.get('id');
    this.channelService.getChannel(this.channelId)
      .subscribe(
        data => {
          this.channel = data.channel;
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
    const userArray = this.channel.user;
    // Remove the user out of local array
    this.channel.user = userArray.filter(user => user.id != id);

    let channel = this.channel;
    // Update Channel with new local array version
    this.updateChannel(channel);
  }

  // Add a user to the Channel
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
    const channelArray = this.channel.user;
    const channelFound = channelArray.some(channel => channel.name.toUpperCase() == this.userSelected.toUpperCase());
    if (channelFound) {
      alert("Can Not Add The Same User to the Same Channel");
    } else {
      // Create new User
      const addUser = {
        _id: selectedUser._id,
        id: selectedUser.id,
        name: selectedUser.name,
        password: selectedUser.password,
        email: selectedUser.email,
        role: selectedUser.role,
        userimage: selectedUser.userimage
      };

      // Push new User to Channel
      this.channel.user.push(addUser);
      let channel = this.channel;
      console.log(channel);
      // Call Update Channel route to update the channel record
      this.updateChannel(channel);
    }
  }

  // Update Channel
  updateChannel(channel) {
    this.channelService.updateChannel(channel)
      .subscribe(
        data => {
          this.getChannel();
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
