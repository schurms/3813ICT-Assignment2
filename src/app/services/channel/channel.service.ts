// Modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// Models
import { Channel } from '../../models/channel.model';
// Variables
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  channels: Channel[];

  constructor(
    private httpClient: HttpClient) { }

  // Function to manage channel reads
  getChannels() {
    return this.httpClient.get<{channels: Channel[]}>(BACKEND_URL + '/api/channels/')
      .pipe(map(channels => {
        if (channels) {
        }
        return channels
      }));
  }

  // Function to manage channel creation
  createChannel(channel) {
    let body = JSON.stringify(channel);
    return this.httpClient.post(BACKEND_URL + '/api/channels/', body, httpOptions);
  }

  // Function to manage channel updates
  updateChannel(channel){
    let body = JSON.stringify(channel);
    return this.httpClient.put(BACKEND_URL + '/api/channels/' + channel.id, body, httpOptions);
  }

  // Function to manage channel deletions
  deleteChannel(channel){
    return this.httpClient.delete(BACKEND_URL + '/api/channels/' + channel.id);
  }

}
