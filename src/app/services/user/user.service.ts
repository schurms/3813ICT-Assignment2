// Modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
// Models
import { User } from '../../models/user.model';
// Variables
import { environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];

  constructor(
    private httpClient: HttpClient) { }

  // Function to get users
  getUsers() {
    return this.httpClient.get<{users: User[]}>(BACKEND_URL + '/api/users/')
      .pipe(map(users => {
        if (users) {
        }
        return users;
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

  // Function to Update Avatar for a Product
  updateAvatar(user) {
    let body = JSON.stringify(user);
    return this.httpClient.put(BACKEND_URL + '/api/updateone/' + user.id, body, httpOptions);
  }

  // Function to manage user deletion
  deleteUser(user) {
    return this.httpClient.delete(BACKEND_URL + '/api/user/' + user.id);
  }

}
