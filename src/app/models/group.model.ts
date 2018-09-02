// Group Class Model

import { Channel } from './channel.model';
import { User } from './user.model';

export class Group {
  _id: any;
  id: number;
  name: string;
  channel: Channel[];
  user: User[];

  constructor( _id: any, id: number, name: string, channel: Channel[], user: User[] ) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.channel = channel;
    this.user = user;
  }
}
