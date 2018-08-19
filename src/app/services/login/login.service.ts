import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: User;

  constructor() { }

  // Function to read user on login
  readUser() {
    if (typeof(Storage) !== 'undefined' ) {
      return JSON.parse(sessionStorage.getItem('user'));
    }
  }

  // Function to write user on login
  writeUser(user) {
    this.user = user;
    if (typeof(Storage) !== 'undefined' ) {
      sessionStorage.setItem('user', JSON.stringify(this.user));
    } else {
      alert('Local storage not available');
    }
  }

  // Function to delete user on login
  deleteUser() {
    if (typeof(Storage) !== 'undefined' ) {
      sessionStorage.clear();
    }
  }

}
