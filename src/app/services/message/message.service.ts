import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from '../../models/message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messages: Message[] = [];

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http.get<{message: string, messages:Message[]}>('http://localhost:3000/api/messages')
      .subscribe((messageData) => {
        this.messages = messageData.messages;
        console.log(this.messages);
      });
  }

  addMessage() {
    const post: Message = {id: null, title: 'tttt', content: 'tllsls'};
    this.http.post<{message: string}>('http://localhost:3000/api/messages', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
  }
}
