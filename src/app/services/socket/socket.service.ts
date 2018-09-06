// Modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

// Variables
import { environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const BACKEND_URL = environment.apiURL;
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = BACKEND_URL;
  private socket;

  constructor(
    private httpClient: HttpClient) { }

  // Function to send a message
  sendMessage(message) {
    // Broadcast the message
    this.socket.emit('add-message', message);
  }

  // Function to get messages
  getMessages() {
    // Set up an observer.  This is for Async communications.
    let observableMessages =  new Observable(

      // Javascript to define handlers.
      observer => {
        // Set up new Socket
        this.socket = io(this.url);

        //Listen for "new - message" events from the server.
        this.socket.on('message', (data) => {
          observer.next(data);
        });

        // When the observer ends (unsubscribes) then disconnect the socket.
        return() => {
          this.socket.disconnect();
        };
      });
    return observableMessages;
  }

  // Function to store a message
  writeMessage(message) {
    let body = JSON.stringify(message);
    return this.httpClient.post(BACKEND_URL + '/api/message/', body, httpOptions);
  }

}

