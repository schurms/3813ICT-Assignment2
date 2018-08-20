import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment} from '../../../environments/environment';
import {Group} from '../../models/group.model';
import {map} from 'rxjs/operators';
import {User} from '../../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];

  constructor(private httpClient: HttpClient) { }

  // Function to manage user creation
  getAuthUser(user) {
    let body = JSON.stringify(user);
    return this.httpClient.post(BACKEND_URL + '/api/authuser/', body, httpOptions);
  }

  // Function to get users
  getUsers() {
    return this.httpClient.get<{users: User[]}>(BACKEND_URL + '/api/users/')
      .pipe(map(users => {
        if (users) {
        }
        return users
      }));
  }

  // Function to manage user creation
  createUser(user) {
    let body = JSON.stringify(user);
    return this.httpClient.post(BACKEND_URL + '/api/user/', body, httpOptions);
  }

  // Function to manage user updates
  updateUser(user) {
    let body = JSON.stringify(user);
    return this.httpClient.put(BACKEND_URL + '/api/user/' + user.id, body, httpOptions);
  }

  // Function to manage user deletion
  deleteUser(user) {
    return this.httpClient.delete(BACKEND_URL + '/api/user/' + user.id);
  }

}
