// Group Class Model

import { Channel } from './channel.model';

export class Group {
  id: number;
  name: string;
  channel: Channel;

  constructor( id: number, name: string, channel: Channel) {
    this.id = id;
    this.name = name;
    this.channel = channel;
  }
}
