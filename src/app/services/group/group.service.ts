// Modules
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
// Models
import { Group } from '../../models/group.model';
// Variables
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groups: Group[];
  group: Group;

  constructor(
    private httpClient: HttpClient) { }

  // Function to manage group reads
  getGroups() {
    return this.httpClient.get<{groups: Group[]}>(BACKEND_URL + '/api/group/')
      .pipe(map(groups => {
        if (groups) {
        }
        return groups
      }));
    }

  // Function to get a group
  getGroup(id) {
    return this.httpClient.get<{group: Group}>(BACKEND_URL + '/api/group/' + id)
      .pipe(map(group => {
        if (group) {
        }
        return group
      }));
  }

 // Function to get a group
  getMyChannels(id) {
    return this.httpClient.get<{groups: Group[]}>(BACKEND_URL + '/api/mychannels/' + id)
      .pipe(map(group => {
        if (group) {
        }
        return group
      }));
  }

  // Function to manage group creation
  createGroup(group) {
    let body = JSON.stringify(group);
    return this.httpClient.post(BACKEND_URL + '/api/group/', body, httpOptions);
  }

  // Function to manage group updates
  updateGroup(group){
    let body = JSON.stringify(group);
    return this.httpClient.put(BACKEND_URL + '/api/group/' + group.id, body, httpOptions);
  }

  // Function to manage group deletions
  deleteGroup(group){
    return this.httpClient.delete(BACKEND_URL + '/api/group/' + group.id);
  }

}
