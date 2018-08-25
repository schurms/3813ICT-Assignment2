// Group Class Model

import { Channel } from './channel.model';
import { User } from './user.model';

export class Group {
  id: number;
  name: string;
  channel: Channel[];
  user: User[];

  constructor( id: number, name: string, channel: Channel[], user: User[]) {
    this.id = id;
    this.name = name;
    this.channel = channel;
    this.user = user;
  }
}
