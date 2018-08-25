// Channel Class Model

import { User } from './user.model';

export class Channel {
  id: number;
  name: string;
  user: User[];

  constructor( id: number, name: string, user: User[] ) {
    this.id = id;
    this.name = name;
    this.user = user;
  }
}
