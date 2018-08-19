import { Component, OnInit } from '@angular/core';
import { Channel } from '../../../../models/channel.model';
import { ChannelService } from '../../../../services/channel/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  channels: Channel[] = null;

  constructor(private channelService: ChannelService) { }

  // On Page Opening
  ngOnInit() {
    this.getChannels()
  }

  // Get Channels
  getChannels() {
    this.channelService.getChannels()
      .subscribe(
        data => {
          this.channels = data.channels
        },
        err => console.log(err)
      );
  }

  // Create Channel
  createChannel(name){
    const channel = {
      name: name,
    };
    this.channelService.createChannel(channel)
      .subscribe(
        data => {
          this.getChannels();
          return true;
        },
        err => console.log(err)
      );
  }

  // Update Channel
  updateChannel(channel){
    this.channelService.updateChannel(channel)
      .subscribe(
        data => {
          this.getChannels();
          return true;
        },
        err => console.log(err)
      );
  }

  // Delete Channel
  deleteChannel(channel){
    this.channelService.deleteChannel(channel)
      .subscribe(
        data => {
          this.getChannels();
          return true;
        },
        err => console.log(err)
      );
  }

}
