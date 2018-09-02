// Modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Models
import { Group } from '../../../../../models/group.model';
import { Channel } from '../../../../../models/channel.model';
// Services
import { GroupService } from '../../../../../services/group/group.service';
import { ChannelService } from '../../../../../services/channel/channel.service';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-groupchannel',
  templateUrl: './groupchannel.component.html',
  styleUrls: ['./groupchannel.component.css']
})
export class GroupchannelComponent implements OnInit {

  groups: Group[];
  group: Group;
  channels: Channel[];
  submitted = false;
  channelForm: FormGroup;
  groupId;
  channelSelected:string;

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private channelService: ChannelService,
              private authService: AuthService,
              private router: Router,
              private location: Location,
              private formBuilder: FormBuilder) { }

  // On Page Opening
  ngOnInit() {
    // Set up Form Validators
    this.channelForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    if(!sessionStorage.getItem('user')) {
      // No valid session is available
      this.authService.deleteUser();
      alert('Please login');
      this.router.navigateByUrl('login');
    } else {
      // Get initial Data
      this.getGroups();
      this.getGroup();
      this.getChannels();
    }


  }

  // Get Groups So Can see if channel has been previously added
  getGroups() {
    this.groupService.getGroups()
      .subscribe(
        data => {
          this.groups = data.groups;
        },
        err => console.log(err)
      );
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

  // Get list of channels available
  getChannels() {
    this.channelService.getChannels()
      .subscribe(
        data => {
          this.channels = data.channels;
        },
        err => console.log(err)
      );
  }

  // Delete channel
  deleteChannel(id) {
    event.preventDefault()
    const channelArray = this.group.channel;
    // Remove the channel out of local array
    this.group.channel = channelArray.filter(channel => channel.id != id);

    let group = this.group;
    // Update Group with new local array version
    this.updateGroup(group);
  }

  // Add a channel to the Group
  addChannel() {
    this.submitted = true;
    event.preventDefault();
    // If errors found in input form
    if (this.channelForm.invalid) {
      return;
    }

    // Find id of selected channel
    const channelArray = this.channels;
    const selectedChannel = channelArray.find(channel => channel.name.toUpperCase() == this.channelSelected.toUpperCase());

    // Test if channel already added to any group
    const groupsArray = this.groups;
    const groupFoundId = groupsArray.find(group => group.channel.some(item => item.name.toUpperCase() == this.channelSelected.toUpperCase()));
    if ( typeof(groupFoundId) !== 'undefined' ) {
      alert("Channel has already been added to a Group");
    } else {
      // Create new Channel
      const addChannel = {
        _id: selectedChannel._id,
        id: selectedChannel.id,
        name: selectedChannel.name,
        user: selectedChannel.user,
      };

      // Push new Channel to Group
      this.group.channel.push(addChannel);
      let group = this.group;
      // Call Update Group route to update the group record
      this.updateGroup(group);
    }
    return;
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
