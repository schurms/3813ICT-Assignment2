// User Class Model

export class User {
  _id: any;
  id: number;
  name: string;
  email: string;
  role: string;

  constructor( _id: any, id: number, name: string, email: string, role: string ) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
