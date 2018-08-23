// Modules
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() { }

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
}
