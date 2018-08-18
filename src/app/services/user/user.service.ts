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

  getUsers() {
    return this.httpClient.get(BACKEND_URL + '/api/users/');
  }

  createUser(user) {
    let body = JSON.stringify(user);
    return this.httpClient.post(BACKEND_URL + '/api/user/', body, httpOptions);
  }

  updateUser(user){
    let body = JSON.stringify(user);
    return this.httpClient.put(BACKEND_URL + '/api/user/' + user.id, body, httpOptions);
  }

  deleteUser(user){
    return this.httpClient.delete(BACKEND_URL + '/api/user/' + user.id);
  }

}
