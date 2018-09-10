// User Class Model

export class User {
  _id: any;
  id: number;
  name: string;
  password: string;
  email: string;
  role: string;

  constructor( _id: any, id: number, name: string, password: string, email: string, role: string ) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.role = role;
  }
}
