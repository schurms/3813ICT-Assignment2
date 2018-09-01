// Message Class Model

import { Channel } from './channel.model';
import { User } from './user.model';

export class Message {
  id: number;
  message: string;
  date: Date;
  user: User;
  channel: Channel;

  constructor( id: number, name: string, date: Date, user: User, channel: Channel ) {
    this.id = id;
    this.message = name;
    this.date = date;
    this.user = user;
    this.channel = channel;
  }
}
