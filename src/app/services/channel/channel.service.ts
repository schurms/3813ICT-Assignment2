import { Injectable } from '@angular/core';
import {Channel} from '../../models/channel.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';


const BACKEND_URL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private httpClient: HttpClient) { }

  getChannels() {
    // return this.httpClient.get(BACKEND_URL + '/api/groups/');

    // this version works.
    return this.httpClient.get<{channels: Channel[]}>(BACKEND_URL + '/api/channels/')
      .pipe(map(channels => {
        if (channels) {
        }
        return channels
      }));
  }

  changeChannel() {

  }

}
