import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  // Function to manage user reads
  getUsers() {
    return this.httpClient.get(BACKEND_URL + '/api/users/');
  }

  // Function to manage user creation
  createUser(user) {
    let body = JSON.stringify(user);
    return this.httpClient.post(BACKEND_URL + '/api/user/', body, httpOptions);
  }

  // Function to manage user updates
  updateUser(user){
    let body = JSON.stringify(user);
    return this.httpClient.put(BACKEND_URL + '/api/user/' + user.id, body, httpOptions);
  }

  // Function to manage user deletion
  deleteUser(user){
    return this.httpClient.delete(BACKEND_URL + '/api/user/' + user.id);
  }

}
