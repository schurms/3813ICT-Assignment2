import { Injectable } from '@angular/core';
import { Group } from '../../models/group.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';


const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groups: Group[];

  constructor(private httpClient: HttpClient) {
  }


  getGroups() {
  //   return this.groups = MOCKGROUPS;
  // }
  //   this.http.get<{ message: string, groups: Group[] }>(  BACKEND_URL + '/api/groups/')
  //     .subscribe((groupData) => {
  //       this.groups = groupData.groups;
  //       return this.groups;
  //     });


    // return this.httpClient.get(BACKEND_URL + '/api/groups/');

    // this version works.
    return this.httpClient.get<{ message: string, groups: Group[] }>(  BACKEND_URL + '/api/groups/')
      .pipe(map(groups => {
        if (groups) {
        }
        return groups
      }));
    }


}