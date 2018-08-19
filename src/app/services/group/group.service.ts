import { Injectable } from '@angular/core';
import { Group } from '../../models/group.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groups: Group[];

  constructor(private httpClient: HttpClient) {
  }

  // Function to manage group reads
  getGroups() {
    return this.httpClient.get<{groups: Group[]}>(BACKEND_URL + '/api/groups/')
      .pipe(map(groups => {
        if (groups) {
        }
        return groups
      }));
    }

  // Function to manage group creation
  createGroup(group) {
    let body = JSON.stringify(group);
    return this.httpClient.post(BACKEND_URL + '/api/groups/', body, httpOptions);
  }

  // Function to manage group updates
  updateGroup(group){
    let body = JSON.stringify(group);
    return this.httpClient.put(BACKEND_URL + '/api/groups/' + group.id, body, httpOptions);
  }

  // Function to manage group deletiohs
  deleteGroup(group){
    return this.httpClient.delete(BACKEND_URL + '/api/groups/' + group.id);
  }

}
