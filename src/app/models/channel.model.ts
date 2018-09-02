// Channel Class Model

import { User } from './user.model';

export class Channel {
  _id: any;
  id: number;
  name: string;
  user: User[];

  constructor( _id: any, id: number, name: string, user: User[] ) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.user = user;
  }
}
