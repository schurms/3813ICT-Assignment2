import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor() { }

  public readUser() {
    if (typeof(Storage) !== 'undefined' ) {
      return JSON.parse(sessionStorage.getItem('username'));
    }
  }

  public writeUser(user) {
    this.user = user;
    if (typeof(Storage) !== 'undefined' ) {
      sessionStorage.setItem('username', JSON.stringify(this.user));
      console.log(this.user);
    } else {
      alert('Local storage not available');
    }
  }

  public deleteUser() {
    if (typeof(Storage) !== 'undefined' ) {
      sessionStorage.clear();
    }
  }

}
