// Modules
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Models
import { Group } from '../../../../../models/group.model';
import { Channel } from '../../../../../models/channel.model';
// Services
import { GroupService } from '../../../../../services/group/group.service';
import { ChannelService } from '../../../../../services/channel/channel.service';

@Component({
  selector: 'app-groupchannel',
  templateUrl: './groupchannel.component.html',
  styleUrls: ['./groupchannel.component.css']
})
export class GroupchannelComponent implements OnInit {

  group: Group;
  channels: Channel[];
  submitted = false;
  channelForm: FormGroup;
  groupId;
  channelSelected:string;

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private channelService: ChannelService,
              private location: Location,
              private formBuilder: FormBuilder) { }

  // On Page Opening
  ngOnInit() {
    // Set up Form Validators
    this.channelForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    // Get initial Data
    this.getGroup();
    this.getChannels();
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

    if (this.channelForm.invalid) {
      return;
    }

    // Find id of selected channel
    const channelArray = this.channels;
    const selectedChannel = channelArray.find(channel => channel.name == this.channelSelected);

    // Test if channel already added
    const groupArray = this.group.channel;
    const groupFound = groupArray.some(group => group.name == this.channelSelected);
    if (groupFound) {
      alert("Can Not Add The Same Channel to the Same Channel");
    } else {
      // Create new Channel
      const addChannel = {
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
