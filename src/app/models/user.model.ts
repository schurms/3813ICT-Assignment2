// User Class Model

export class User {
  id: number;
  name: string;
  email: string;
  role: string;

  constructor( id: number, name: string, role: string ) {
    this.id = id;
    this.name = name;
    this.role = role;
  }
}
