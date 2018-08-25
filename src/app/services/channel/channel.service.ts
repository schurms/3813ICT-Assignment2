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
  channel: Channel;

  constructor(
    private httpClient: HttpClient) { }

  // Function to manage channel reads
  getChannels() {
    return this.httpClient.get<{channels: Channel[]}>(BACKEND_URL + '/api/channel/')
      .pipe(map(channels => {
        if (channels) {
        }
        return channels
      }));
  }

  // Function to get a channel
  getChannel(id) {
    return this.httpClient.get<{channel: Channel}>(BACKEND_URL + '/api/channel/' + id)
      .pipe(map(channel => {
        if (channel) {
        }
        return channel
      }));
  }
  // Function to manage channel creation
  createChannel(channel) {
    let body = JSON.stringify(channel);
    return this.httpClient.post(BACKEND_URL + '/api/channel/', body, httpOptions);
  }

  // Function to manage channel updates
  updateChannel(channel){
    let body = JSON.stringify(channel);
    return this.httpClient.put(BACKEND_URL + '/api/channel/' + channel.id, body, httpOptions);
  }

  // Function to manage channel deletions
  deleteChannel(channel){
    return this.httpClient.delete(BACKEND_URL + '/api/channel/' + channel.id);
  }

}
