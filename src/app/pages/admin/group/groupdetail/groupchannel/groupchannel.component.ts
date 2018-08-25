// Modules
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
      name: [''],
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

  // Delete channel
  deleteChannel() {
    console.log(this.group);

  }

  // Return to previous page
  goBack(): void {
    this.location.back();
  }

  addChannel() {
    // Find id of selected channel
    const channelArray = this.channels;
    const selectedChannel = channelArray.find(channel => channel.name == this.channelSelected);

    // Create new Channel
    const addChannel = {
      id: selectedChannel.id,
      name: selectedChannel.name,
    };

    // Push new Channel to Group
    this.group.channel.push(addChannel);

    console.log('here now');
    let group = this.group;
    this.groupService.updateGroup(group)
      .subscribe(
        data => {
          this.getGroup();
          return true;
        },
        err => console.log(err)
      );
  }



}