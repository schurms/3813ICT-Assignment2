// Modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Models
import { User } from '../../models/user.model';
// Variables
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    private httpClient: HttpClient) { }

  // Function to validate if user is in the system
  getLoginUser(user) {
  let body = JSON.stringify(user);
  return this.httpClient.post(BACKEND_URL + '/api/login/', body, httpOptions);
}

// Function to manage user creation
  getAuthUser(user) {
    let body = JSON.stringify(user);
    return this.httpClient.post(BACKEND_URL + '/api/authuser/', body, httpOptions);
  }

  // Function to read user on login
  readUser() {
    if ( typeof(Storage) !== 'undefined' ) {
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
