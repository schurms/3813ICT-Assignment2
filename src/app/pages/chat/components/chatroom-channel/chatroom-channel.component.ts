import { Component, OnInit } from '@angular/core';
import {ChannelService} from '../../../../services/channel/channel.service';
import {Channel} from '../../../../models/channel.model';

@Component({
  selector: 'app-chatroom-channel',
  templateUrl: './chatroom-channel.component.html',
  styleUrls: ['./chatroom-channel.component.css']
})
export class ChatroomChannelComponent implements OnInit {

  channels: Channel[] = null;

  constructor(
    private channelService: ChannelService) {
  }

  ngOnInit() {
    this.getChannels();
  }

  getChannels() {
    this.channelService.getChannels()
      .subscribe(
        data => {
          this.channels = data.channels;
        },
        err => console.log(err)
      );
  }

}
